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

const show = (req, res) => {
  db.Cube.findById(req.params.id)
    .then(foundCube => {
      res.json({ cube: foundCube });
    })
    .catch(err => {
      console.log("Error in cubes.show:", err);
      res.json({ Error: "Unable to get data" });
    });
};

// Creates New Cube and saves cube Id to current user
const create = (req, res) => {
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

  db.Cube.create(newCube)
    .then(createdCube => {
      db.User.findById(newCube.user).then(foundUser => {
        foundUser.cubes.push(createdCube._id);
        foundUser.save().then(savedUser => {
          db.Category.findById(req.body.category).then(foundCategory => {
            foundCategory.cubes.push(createdCube._id);
            foundCategory.save().then(savedCategory => {
              res.json({
                cube: createdCube,
                category: foundCategory,
              });
            });
          });
        });
      });
    })
    .catch(err => {
      console.log("Unable to create cube in cubes.create:", err);
      res.json({
        cubeError: "Unable to create cube",
        question: req.body.question,
        answer: req.body.answer,
        category: req.body.category,
      });
    });
};

const update = (req, res) => {
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
    db.Cube.findById(req.params.id).then(foundCube => {
      console.log(foundCube);
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
        let deletedOldCategory;
        db.Category.findById(foundCube.category).then(foundOldCategory => {
          const cubeIndex = foundOldCategory.cubes.indexOf(foundCube._id);
          foundOldCategory.cubes.splice(cubeIndex, 1);
          foundOldCategory.save().then(savedCategory => {
            if (savedCategory.cubes.length === 0) {
              db.Category.findByIdAndDelete(savedCategory._id)
                .then(deletedCategory => {
                  deletedOldCategory = deletedCategory;
                })
                .then(() => {
                  db.Category.findById(req.body.category)
                    .then(foundNewCategory => {
                      foundNewCategory.cubes.push(foundCube._id);
                      foundNewCategory.save();
                      return foundNewCategory;
                    })
                    .then(newCategory => {
                      db.Cube.findByIdAndUpdate(req.params.id, changedCube, {
                        new: true,
                      }).then(updatedCube => {
                        return res.json({
                          cube: updatedCube,
                          category: newCategory,
                          oldCategory: deletedOldCategory,
                        });
                      });
                    });
                });
            } else {
              db.Category.findById(req.body.category)
                .then(foundNewCategory => {
                  foundNewCategory.cubes.push(foundCube._id);
                  foundNewCategory.save();
                  return foundNewCategory;
                })
                .then(newCategory => {
                  db.Cube.findByIdAndUpdate(req.params.id, changedCube, {
                    new: true,
                  }).then(updatedCube => {
                    res.json({
                      cube: updatedCube,
                      category: newCategory,
                    });
                  });
                });
            }
          });
        });
      } else {
        console.log("HERE");
        console.log(req.params.id);
        console.log(changedCube);
        db.Cube.findByIdAndUpdate(req.params.id, changedCube, {
          new: true,
        }).then(updatedCube => {
          console.log("UPDATED CUBE", updatedCube);
          db.Category.findById(req.body.category).then(foundCategory => {
            res.json({
              cube: updatedCube,
              category: foundCategory,
            });
          });
        });
      }
    });
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

const destroy = (req, res) => {
  db.Cube.findByIdAndDelete(req.params.id).then(deletedCube => {
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
    db.User.findById(deletedCube.user).then(foundUser => {
      foundUser.cubes.remove(req.params.id);
      foundUser.save();
    });
    db.Category.findById(deletedCube.category).then(foundCategory => {
      foundCategory.cubes.remove(req.params.id);
      foundCategory.save().then(savedCategory => {
        if (savedCategory.cubes.length === 0) {
          db.Category.findByIdAndDelete(savedCategory._id).then(
            deletedCategory => {
              res.json({ cube: deletedCube, category: deletedCategory });
            }
          );
        } else {
          res.json({ cube: deletedCube });
        }
      });
    });
  });
};

// ./lucuberate-client/public/uploads/

module.exports = {
  // index,
  show,
  create,
  update,
  destroy,
};
