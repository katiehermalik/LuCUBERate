const db = require("../models");
const fs = require("fs");
const multer = require("multer");
const Cube = require("../models/Cube")

const index = (req, res) => {
  db.Cube.find({})
    .then((foundCubes) => {
      res.json({ cubes: foundCubes});
    })
    .catch((err) => {
      console.log('Error in cubes.index:', err);
      res.json({ Error: 'Unable to get data'});
    });
};

const show = (req, res) => {
  db.Cube.findById(req.params.id)
  .then((foundCube) => {
    res.json({ cube: foundCube });
  })
  .catch((err) => {
    console.log('Error in cubes.show:', err);
    res.json({ Error: 'Unable to get data'});
  });
};

// Creates New Cube and saves cube Id to current user
const create = (req, res) => { 
  console.log('new cube from req.body', req.body);
  const newCube = {
    question: req.body.question,
    answer: req.body.answer,
    hint: req.body.hint || '',
    visual_aid: req.file && req.file.location,
    link: req.body.link || '',
    link_alias: req.body.link_alias || 
      (req.body.link ? 'Resource' : ''),
    notes: req.body.notes || '',
    user: req.body.user,
    category: req.body.category
  }

  db.Cube.create(newCube)
  .then((createdCube) => {
    console.log('User ID',newCube.user);
    db.User.findById(newCube.user)
    .then((foundUser) => {
      console.log('foundUser------->', foundUser);
      foundUser.cubes.push(createdCube._id);
      foundUser.save()
      .then((savedUser) => {    
        db.Category.findById(req.body.category)
        .then((foundCategory) => {
          console.log('foundCategory------->', foundCategory);
          foundCategory.cubes.push(createdCube._id);
          foundCategory.save()
          .then((savedCategory) => {
            console.log('createdCube', createdCube);
            res.json({ 
              cube: createdCube,
              category: foundCategory 
            })
          })
        })
      })
    })          
  })
  .catch((err) => {
    console.log('Unable to create cube in cubes.create:', err);
    res.json({ 
      cubeError: 'Unable to create cube', 
      question: req.body.question, 
      answer: req.body.answer
    });
  });
};

const update = (req, res) => {
  console.log("req.body",req.body);
  const changedCube = {
    question: req.body.question,
    answer: req.body.answer,
    hint: req.body.hint || '',
    link: req.body.link || '',
    link_alias: req.body.link_alias || 
    (req.body.link ? 'Resource' : ''),
    notes: req.body.notes || '',
    user: req.body.user,
    category: req.body.category
  }
  // If no new image uploaded on edit form, visual_aid will be previous image
  if (req.file) {
    changedCube.visual_aid = req.file && req.file.location
  } 
  if (changedCube.question && changedCube.answer) {


    // .then((savedUser) => {    
    //   db.Category.findById(req.body.category)
    //   .then((foundCategory) => {
    //     console.log('foundCategory------->', foundCategory);
    //     foundCategory.cubes.push(createdCube._id);
    //     foundCategory.save()
    //     .then((savedCategory) => {
    //       console.log('createdCube', createdCube);
    //       res.json({ 
    //         cube: createdCube,
    //         category: foundCategory 
    //       })
    //     })
    //   })
    // })
    db.Cube.findById(req.params.id)
    .then((foundCube) => {
      if (foundCube.category != req.body.category) {
        console.log('foundCube.category',foundCube.category)
        console.log('req.body.category',req.body.category)
        
        db.Category.findById(foundCube.category)
        .then((foundOldCategory) => {
          const cubeIndex = foundOldCategory.cubes.indexOf(foundCube._id);
          foundOldCategory.cubes.splice(cubeIndex, 1);
          foundOldCategory.save()
          console.log('foundOldCategory------->', foundOldCategory);
        }).then(() => {
          db.Category.findById(req.body.category)
          .then((foundNewCategory) => {
            foundNewCategory.cubes.push(foundCube._id);
            foundNewCategory.save()
            console.log('foundNewCategory------->', foundNewCategory);
            return foundNewCategory;
          })
          .then((newCategory) => {
            db.Cube.findByIdAndUpdate(req.params.id, changedCube, { new: true })
            .then((updatedCube) => {
              console.log('Category Changed!!!!!');
              console.log('updateCube', updatedCube);
              console.log('foundNewCategory', newCategory);
              res.json({ 
                cube: updatedCube,
                category: newCategory
              })
            })
          })
        })
      } else {
        db.Cube.findByIdAndUpdate(req.params.id, changedCube, { new: true })
        .then((updatedCube) => {
          db.Category.findById(req.body.category)
          .then((foundCategory) => {
            console.log('Category Stayed the Same!!!!');
            console.log('updateCube', updatedCube);
            console.log('foundCategory', foundCategory);
            res.json({ 
              cube: updatedCube,
              category: foundCategory
            })
          })
        })
      }
    })


    // .catch((err) => {
    //   console.log('Error in cubes.update:', err);
    //   res.json({ Error: 'Unable to get data'});
    // });

    // res.json({ 
    //   cubeError: 'Unable to save cube', 
    //   question: req.body.question, 
    //   answer: req.body.answer
    // });
  }
};

const destroy = (req, res) => {
  db.Cube.findByIdAndDelete(req.params.id)
  .then((deletedCube) => {
    if (deletedCube.visual_aid) {
      fs.unlinkSync(`${deletedCube.visual_aid}`)
    }
    db.User.findById(deletedCube.user)
    .then((foundUser) => {
      foundUser.cubes.remove(req.params.id);
      foundUser.save()
    })
    db.Category.findById(deletedCube.category)
    .then((foundCategory) => {
      console.log('found Category in delete!!', foundCategory);
      foundCategory.cubes.remove(req.params.id);
      foundCategory.save()
      .then((savedCategory) => {
        res.json({ cube: deletedCube })
      })
    })
  })
} 

// ./lucuberate-client/public/uploads/



module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
