const db = require("../models");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

require("dotenv").config();
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const accessKey = process.env.ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

// const index = (req, res) => {
//   db.Category.find({})
//     .then(foundCategories => {
//       res.json({ categories: foundCategories });
//     })
//     .catch(err => {
//       console.log("Error in categories.index:", err);
//       res.json({ Error: "Unable to get data" });
//     });
// };

// const show = (req, res) => {
//   db.Category.findById(req.params.id)
//     .then(foundCategory => {
//       res.json({ category: foundCategory });
//     })
//     .catch(err => {
//       console.log("Error in categories.show:", err);
//       res.json({ Error: "Unable to get data" });
//     });
// };

// Creates New Category and saves category Id to current user
const create = async (req, res) => {
  try {
    const { title, user } = req.body;
    const newCategory = {
      title,
      user,
    };
    const createdCategory = await db.Category.create(newCategory);
    const foundUser = await db.User.findById(user);
    foundUser.categories.push(createdCategory._id);
    await foundUser.save();
    res.json(createdCategory);
  } catch (err) {
    res.json(err);
  }
};

const destroy = async (req, res) => {
  try {
    const categoryToDelete = await db.Category.findById(req.params.id).populate(
      "cubes"
    );
    const foundUser = await db.User.findById(categoryToDelete.user);
    // Remove Category Reference from User
    await foundUser.updateOne({
      $pull: { categories: req.params.id },
    });
    // Delete cube visual aid, remove cube reference from user, & delete cube
    categoryToDelete.cubes.map(async cube => {
      // Delete Cube Visual Aid
      if (cube.visual_aid) {
        const params = {
          Bucket: bucketName,
          Key: cube.visual_aid,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      }
      // Remove Cube reference from User
      await foundUser.updateOne({ $pull: { cubes: cube._id } });
      // Delete Cube
      await db.Cube.findByIdAndDelete(cube._id);
    });
    await foundUser.save();
    // Delete Category
    const deletedCategory = await db.Category.findByIdAndDelete(req.params.id);
    res.json({ category: deletedCategory });
  } catch (err) {
    res.json(err);
  }
};

const shuffle = async (req, res) => {
  try {
    const foundCategory = await db.Category.findById(req.params.id);
    // Fisher–Yates shuffle
    let m = foundCategory.cubes.length;
    let i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      [foundCategory.cubes[m], foundCategory.cubes[i]] = [
        foundCategory.cubes[i],
        foundCategory.cubes[m],
      ];
    }
    const savedCategory = await foundCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  // index,
  // show,
  create,
  destroy,
  shuffle,
};
