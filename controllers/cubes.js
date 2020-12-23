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

  const newCube = {
    question: req.body.question,
    answer: req.body.answer,
    hint: req.body.hint || '',
    visual_aid: req.file && req.file.filename,
    link: req.body.link || '',
    link_alias: req.body.link_alias || 
      (req.body.link ? 'Resource' : ''),
    notes: req.body.notes || '',
  }

  db.Cube.create(newCube)
  .then((savedCube) => {
    db.User.findById(JSON.parse(req.body.user).user_Id)
    .then((foundUser) => {
      foundUser.cubes.push(savedCube._id);
      foundUser.save()
      .then((savedUser) => {
        savedCube.user = JSON.parse(req.body.user).user_Id;
        savedCube.save()
        .then((updatedCube) => {
          res.json({ cube: savedCube })
        })
        .catch((err)=> {
          console.log('Unable to save user to cube in cubes.create:', err);
          res.json({ Error: 'Unable to save user to cube'});
        })
      })
      .catch((err) => {
        console.log('Unable to save cube to user in cubes.create:', err);
        res.json({ Error: 'Unable to save cube to user'});
      })
    })
    .catch((err) => {
      console.log('Unable to find User in cubes.create:', err);
      res.json({ Error: 'Unable to find User'});
    })
  })
  .catch((err) => {
    console.log('Unable to save cube in cubes.create:', err);
    res.json({ Error: 'Unable to save cube'});
  });
};

const update = (req, res) => {

  const changedCube = {
    question: req.body.question,
    answer: req.body.answer,
    hint: req.body.hint || '',
    visual_aid: req.file && req.file.filename,
    link: req.body.link || '',
    link_alias: req.body.link_alias || 
      (req.body.link ? 'Resource' : ''),
    notes: req.body.notes || '',
  }

  db.Cube.findByIdAndUpdate(req.body.cubeId, changedCube, { new: true })
  .then((updatedCube) => {
    res.json({ cube: updatedCube });
  })
  .catch((err) => {
    console.log('Error in cubes.update:', err);
    res.json({ Error: 'Unable to get data'});
  });
};

const destroy = (req, res) => {
  db.Cube.findByIdAndDelete(req.params.id)
  .then((deletedCube) => {
    fs.unlinkSync(`./lucuberate-client/public/uploads/${deletedCube.visual_aid}`)
    db.User.findById(deletedCube.user)
    .then((foundUser) => {
      foundUser.cubes.remove(req.params.id);
      foundUser.save()
      .then((savedUser) => {
        res.json({ cube: deletedCube })
      })
      .catch((err) => {
        console.log('Unable to save updated user cubes.destroy:', err);
        res.json({ Error: 'Unable to save updated user'});
      })
    })
    .catch((err) => {
      console.log('Unable to find User in cubes.destroy:', err);
      res.json({ Error: 'Unable to find User'});
    })
  })
  .catch((err) => {
    console.log('Unable to find and delete cube in cubes.destroy:', err);
    res.json({ Error: 'Unable to find and delete cube'});
  });
} 


module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
