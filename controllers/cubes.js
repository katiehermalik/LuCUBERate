const db = require("../models");
const uuid = require("uuid").v4;
const path = require("path");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");

require("dotenv").config();
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const accessKey = process.env.ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const cloudFrontPrivateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
const cloudFrontKeyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

const show = async (req, res) => {
  try {
    const foundCube = await db.Cube.findById(req.params.id);
    if (foundCube.visual_aid) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: foundCube.visual_aid,
      };
      // Check if object exists in S3 bucket first
      const headCommand = new HeadObjectCommand(getObjectParams);
      await s3.send(headCommand);

      // Get signed url so that CloudFront can validate the request came from a logged in user on this app.
      const visual_aid_url = getSignedUrl({
        url: `https://dwsjxft4cvgm2.cloudfront.net/${foundCube.visual_aid}`,
        dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24),
        privateKey: cloudFrontPrivateKey,
        keyPairId: cloudFrontKeyPairId,
      });
      const cubeWithVisualAid = { ...foundCube._doc, visual_aid_url };
      res.json({ cube: cubeWithVisualAid });
    } else {
      res.json({ cube: foundCube });
    }
  } catch (err) {
    if (err.name === "NotFound") {
      const foundCube = await db.Cube.findById(req.params.id);
      foundCube.visual_aid = "";
      await foundCube.save();
      res.json({ cube: foundCube });
    } else {
      console.log("Unable to retrieve cube data in cubes.show:", err);
      res.json({ Error: err });
    }
  }
};

// Creates New Cube and saves cube Id to current user
const create = async (req, res) => {
  try {
    const {
      body: {
        question,
        answer,
        hint,
        link_1,
        link_alias_1,
        notes,
        user,
        category,
      },
    } = req;
    const newCube = {
      question: question,
      answer: answer,
      hint: hint || "",
      link_1: link_1 || "",
      link_alias_1: link_alias_1 || (link_1 ? "Resource" : ""),
      notes: notes || "",
      user: user,
      category: category,
    };
    if (req.file) {
      const randomImageName = uuid();
      const ext = path.extname(req.file.originalname);
      const params = {
        Bucket: bucketName,
        Key: `${randomImageName}${ext}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
      newCube.visual_aid = `${randomImageName}${ext}`;
    } else {
      newCube.visual_aid = "";
    }
    const createdCube = await db.Cube.create(newCube);
    const foundUser = await db.User.findById(newCube.user);
    foundUser.cubes.push(createdCube._id);
    await foundUser.save();
    const foundCategory = await db.Category.findById(category);
    foundCategory.cubes.push(createdCube._id);
    await foundCategory.save();
    res.json({
      cube: createdCube,
      category: foundCategory,
    });
  } catch (err) {
    console.log("Unable to create cube in cubes.create:", err);
    res.json({ Error: err });
  }
};

const update = async (req, res) => {
  try {
    const {
      body: {
        question,
        answer,
        hint,
        link_1,
        link_alias_1,
        notes,
        user,
        category,
        removingVisualAid,
      },
    } = req;
    const changedCube = {
      question: question,
      answer: answer,
      hint: hint || "",
      link_1: link_1 || "",
      link_alias_1: link_alias_1 || (link_1 ? "Resource" : ""),
      notes: notes || "",
      user: user,
      category: category,
      removingVisualAid: removingVisualAid,
    };
    const foundCube = await db.Cube.findById(req.params.id);
    // Handle Removing Old Image
    if (
      (!req.file && changedCube.removingVisualAid === "true") ||
      (req.file && foundCube.visual_aid)
    ) {
      if (!foundCube.visual_aid.includes("seedData")) {
        const params = {
          Bucket: bucketName,
          Key: foundCube.visual_aid,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      }
      changedCube.visual_aid = "";
    }
    // Handle New Image Uploaded - If no new image uploaded on edit form, visual_aid will be previous image
    if (req.file) {
      const randomImageName = uuid();
      const ext = path.extname(req.file.originalname);
      const params = {
        Bucket: bucketName,
        Key: `${randomImageName}${ext}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
      changedCube.visual_aid = `${randomImageName}${ext}`;
    }
    // Handle Category Change
    if (foundCube.category != category) {
      const foundOldCategory = await db.Category.findById(foundCube.category);
      const foundUser = await db.User.findById(foundCube.user);
      // Handle Last Cube in Category being moved scenario
      if (foundOldCategory.cubes.length === 1) {
        const deletedCategory = await db.Category.findByIdAndDelete(
          foundOldCategory._id
        );
        await foundUser.updateOne({
          $pull: { categories: deletedCategory._id },
        });
        await foundUser.save();
      } else {
        await foundCategory.updateOne({ $pull: { cubes: req.params.id } });
        await foundOldCategory.save();
      }
      const newCategory = await db.Category.findById(category);
      newCategory.cubes.push(foundCube._id);
      await newCategory.save();
      const updatedCube = await db.Cube.findByIdAndUpdate(
        req.params.id,
        changedCube,
        { new: true }
      );
      res.json({
        cube: updatedCube,
        category: newCategory,
      });
    } else {
      const updatedCube = await db.Cube.findByIdAndUpdate(
        req.params.id,
        changedCube,
        { new: true }
      );
      const foundCategory = await db.Category.findById(category);
      res.json({
        cube: updatedCube,
        category: foundCategory,
      });
    }
  } catch (err) {
    console.log("Unable to update cube in cubes.update:", err);
    res.json({ Error: err });
  }
};

const destroy = async (req, res) => {
  try {
    const cubeToDelete = await db.Cube.findById(req.params.id);
    // Delete Cube Visual Aid
    if (
      cubeToDelete.visual_aid &&
      !cubeToDelete.visual_aid.includes("seedData")
    ) {
      const params = {
        Bucket: bucketName,
        Key: cubeToDelete.visual_aid,
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }
    const foundUser = await db.User.findById(cubeToDelete.user);
    const foundCategory = await db.Category.findById(cubeToDelete.category);
    // Remove cube from user
    await foundUser.updateOne({ $pull: { cubes: req.params.id } });
    await foundUser.save();

    // Delete Category as well if this was the last cube in the category
    if (foundCategory.cubes.length === 1) {
      // Remove category from user
      await foundUser.updateOne({ $pull: { categories: foundCategory._id } });
      await foundUser.save();
      // Delete Category
      await db.Category.findByIdAndDelete(foundCategory._id);
    } else {
      // Remove cube from category
      await foundCategory.updateOne({ $pull: { cubes: req.params.id } });
      await foundCategory.save();
    }

    // Delete Cube
    const deletedCube = await db.Cube.findByIdAndDelete(req.params.id);
    res.json({
      cube: deletedCube,
    });
  } catch (err) {
    console.log("Unable to delete cube in cubes.destroy:", err);
    res.json({ Error: err });
  }
};

module.exports = {
  show,
  create,
  update,
  destroy,
};
