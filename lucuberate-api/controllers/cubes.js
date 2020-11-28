const db = require("../models");

const index = (req, res) => {
  db.Cube.find({user: 1})
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

const create = (req, res) => {
  db.Cube.create(req.body)
  .then((savedCube) => {
    res.json({ cube: savedCube });
  })
  .catch((err) => {
    console.log('Error in cubes.create:', err);
    res.json({ Error: 'Unable to get data'});
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
    res.json({ cube: deletedCube });
  })
  .catch((err) => {
    console.log('Error in cubes.destroy:', err);
    res.json({ Error: 'Unable to get data'});
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
