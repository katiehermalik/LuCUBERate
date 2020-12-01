const db = require("../models");

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
  db.Cube.create(req.body.cube)
  .then((savedCube) => {
    db.User.findById(req.body.user.user_Id)
    .then((foundUser) => {
      foundUser.cubes.push(savedCube._id);
      foundUser.save()
      .then((savedUser) => {
        savedCube.user = req.body.user.user_Id;
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
  db.Cube.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
    db.User.findById(deletedCube.user)
    .then((foundUser) => {
      console.log(foundUser)
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
