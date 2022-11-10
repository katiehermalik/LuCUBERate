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
const create = (req, res) => {
  console.log("THIS IS BEING HIT");
  const { title, user } = req.body;

  const newCategory = {
    title,
    user,
  };
  console.log({ newCategory });
  db.Category.create(newCategory)
    .then(savedCategory => {
      console.log({ savedCategory });
      db.User.findById(user).then(foundUser => {
        console.log({ foundUser });
        foundUser.categories.push({
          _id: savedCategory._id,
          title: savedCategory.title,
        });
        foundUser.save();
        console.log({ savedCategory });
        res.json(savedCategory);
      });
    })
    .catch(err => {
      console.log("Unable to find User in categories.create:", err);
      res.json({ Error: "Unable to find User" });
    })
    .catch(err => {
      console.log("Unable to save category in categories.create:", err);
      res.json({
        categoryError: "Unable to save category",
        category: req.body.title,
      });
    });
};

const destroy = (req, res) => {
  db.Category.findByIdAndDelete(req.params.id).then(deletedCategory => {
    deletedCategory.cubes.map(cube => {
      db.Cube.findByIdAndDelete(cube._id).then(deletedCube => {
        if (deletedCube.visual_aid) {
          s3.deleteObject(
            { Bucket: "lucuberatebucket", Key: deletedCube.visual_aid },
            (err, data) => {
              console.error("err", err);
            }
          );
        }
        db.User.findById(deletedCube.user).then(foundUser => {
          foundUser.cubes.remove(deletedCube._id);
          foundUser.save();
        });
      });
    });
    db.User.findById(deletedCategory.user)
      .then(foundUser => {
        foundUser.categories.remove(deletedCategory._id);
        foundUser.save();
      })
      .then(() => {
        res.json({ category: deletedCategory });
      });
  });
};

const shuffle = (req, res) => {
  db.Category.findById(req.params.id).then(foundCategory => {
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
    foundCategory.save().then(savedCategory => {
      res.json(savedCategory);
    });
  });
};

module.exports = {
  // index,
  // show,
  create,
  destroy,
  shuffle,
};
