const db = require("../models");

const show = (req, res) => {
  db.User.findById(req.params.id)
    .populate('cubes')
    .then((populatedUser) => {
      res.json({ cubes: populatedUser.cubes })
    })
    .catch((err) => {
      console.log('Unable to populate cubes for user in cubes.create:', err);
      res.json({ Error: 'Unable to populate cubes for user'});
    })
};

const index = (req, res) => {
  db.User.find({})
    .then((foundUsers) => {
      res.json({ cubes: foundUsers });
    })
    .catch((err) => {
      console.log('Error in users.index:', err);
      res.json({ Error: 'Unable to get data'});
    });
  }

const create = (req, res) => {
  db.User.create(req.body)
  .then((savedUser) => {
    res.json({ user: savedUser });
  })
  .catch((err) => {
    console.log('Error in users.create:', err);
    res.json({ Error: 'Unable to get data'});
  });
};

const update = (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedUser) => {
    res.json({ user: updatedUser });
  })
  .catch((err) => {
    console.log('Error in users.update:', err);
    res.json({ Error: 'Unable to get data'});
  });
};

const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id)
  .then((deletedUser) => {
    res.json({ user: deletedUser });
  })
  .catch((err) => {
    console.log('Error in users.destroy:', err);
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
