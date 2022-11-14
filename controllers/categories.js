const db = require("../models");
const AWS = require("aws-sdk");
const multer = require("multer");
const Cube = require("../models/Cube");

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
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
    foundUser.categories.push({
      _id: createdCategory._id,
      title: createdCategory.title,
    });
    foundUser.save();
    res.json(createdCategory);
  } catch (err) {
    res.json(err);
  }
};

const destroy = async (req, res) => {
  try {
    const deletedCategory = await db.Category.findByIdAndDelete(req.params.id);
    deletedCategory.cubes.map(async cube => {
      const deletedCube = await db.Cube.findByIdAndDelete(cube._id);
      if (deletedCube.visual_aid) {
        s3.deleteObject(
          { Bucket: "lucuberatebucket", Key: deletedCube.visual_aid },
          err => {
            console.error(err);
          }
        );
      }
      const foundUser = await db.User.findById(deletedCube.user);
      foundUser.cubes.remove(deletedCube._id);
      foundUser.save();
    });
    const foundUser = await db.User.findById(deletedCategory.user);
    foundUser.categories.remove(deletedCategory._id);
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
