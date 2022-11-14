const db = require("../models");
const fs = require("fs");
const AWS = require("aws-sdk");
const multer = require("multer");
const Cube = require("../models/Cube");

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

// const index = (req, res) => {
//   db.Cube.find({})
//     .then(foundCubes => {
//       res.json({ cubes: foundCubes });
//     })
//     .catch(err => {
//       console.log("Error in cubes.index:", err);
//       res.json({ Error: "Unable to get data" });
//     });
// };

const show = async (req, res) => {
  try {
    const foundCube = await db.Cube.findById(req.params.id);
    res.json({ cube: foundCube });
  } catch (err) {
    console.log("Error in cubes.show:", err);
    res.json({ Error: "Unable to get data" });
  }
};

// Creates New Cube and saves cube Id to current user
const create = async (req, res) => {
  try {
    console.log(req.body);
    const newCube = {
      question: req.body.question,
      answer: req.body.answer,
      hint: req.body.hint || "",
      visual_aid: req.file && req.file.location,
      link: req.body.link || "",
      link_alias: req.body.link_alias || (req.body.link ? "Resource" : ""),
      notes: req.body.notes || "",
      user: req.body.user,
      category: req.body.category,
    };
    console.log(newCube);
    const createdCube = await db.Cube.create(newCube);
    const foundUser = await db.User.findById(newCube.user);
    foundUser.cubes.push(createdCube._id);
    foundUser.save();
    const foundCategory = await db.Category.findById(req.body.category);
    foundCategory.cubes.push(createdCube._id);
    foundCategory.save();
    res.json({
      cube: createdCube,
      category: foundCategory,
    });
  } catch (err) {
    console.log("Unable to create cube in cubes.create:", err);
    res.json({
      cubeError: "Unable to create cube",
      question: req.body.question,
      answer: req.body.answer,
      category: req.body.category,
    });
  }
};

const update = async (req, res) => {
  const changedCube = {
    question: req.body.question,
    answer: req.body.answer,
    hint: req.body.hint || "",
    link: req.body.link || "",
    link_alias: req.body.link_alias || (req.body.link ? "Resource" : ""),
    notes: req.body.notes || "",
    user: req.body.user,
    category: req.body.category,
    removingVisualAid: req.body.removingVisualAid,
  };
  // If no new image uploaded on edit form, visual_aid will be previous image
  if (req.file) {
    changedCube.visual_aid = req.file && req.file.location;
  }
  if (changedCube.question && changedCube.answer && changedCube.category) {
    const foundCube = await db.Cube.findById(req.params.id);
    // console.log(req.file);
    // console.log(foundCube.visual_aid);
    // console.log(changedCube.visual_aid);
    // console.log(changedCube.removingVisualAid);
    if (!req.file && changedCube.removingVisualAid === "true") {
      changedCube.visual_aid = "";
      s3.deleteObject(
        { Bucket: "lucuberatebucket", Key: foundCube.visual_aid },
        (err, data) => {
          console.error("err", err);
        }
      );
    }
    // req.file ?? fs.unlinkSync(foundCube.visual_aid);
    if (foundCube.category != req.body.category) {
      const foundOldCategory = await db.Category.findById(foundCube.category);
      const foundUser = await db.User.findById(foundCube.user);
      if (foundOldCategory.cubes.length === 1) {
        const deletedCategory = await db.Category.findByIdAndDelete(
          foundOldCategory._id
        );
        foundUser.categories.remove(deletedCategory._id);
        foundUser.save();
      } else {
        foundOldCategory.cubes.remove(req.params.id);
        foundOldCategory.save();
      }
      const newCategory = await db.Category.findById(req.body.category);
      newCategory.cubes.push(foundCube._id);
      newCategory.save();
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
      const foundCategory = await db.Category.findById(req.body.category);
      res.json({
        cube: updatedCube,
        category: foundCategory,
      });
    }
  } else {
    console.log("Unable to update cube in cubes.update:");
    res.json({
      cubeError: "Unable to update cube",
      question: req.body.question,
      answer: req.body.answer,
      category: req.body.category,
    });
  }
};

const destroy = async (req, res) => {
  const deletedCube = await db.Cube.findByIdAndDelete(req.params.id);
  if (deletedCube.visual_aid) {
    console.log("VISUAL AID", deletedCube.visual_aid);
    s3.deleteObject(
      { Bucket: "lucuberatebucket", Key: deletedCube.visual_aid },
      (err, data) => {
        console.error(err);
      }
    );
    // fs.unlinkSync(deletedCube.visual_aid)
    // `${deletedCube.visual_aid}`
    // fs.unlinkSync(`./lucuberate-client/public/uploads/${deletedCube.visual_aid}`)
    // 16ab58d2-d1f8-4e3d-aa44-d7330c4d0022
  }
  const foundCategory = await db.Category.findById(deletedCube.category);
  const foundUser = await db.User.findById(deletedCube.user);
  if (foundCategory.cubes.length === 1) {
    const deletedCategory = await db.Category.findByIdAndDelete(
      foundCategory._id
    );
    foundUser.cubes.remove(req.params.id);
    foundUser.categories.remove(deletedCategory._id);
    foundUser.save();
    res.json({ cube: deletedCube, categoryDeleted: deletedCategory });
  } else {
    foundUser.cubes.remove(req.params.id);
    foundUser.save();
    foundCategory.cubes.remove(req.params.id);
    foundCategory.save();
    res.json({ cube: deletedCube });
  }
};

// ./lucuberate-client/public/uploads/

module.exports = {
  // index,
  show,
  create,
  update,
  destroy,
};
