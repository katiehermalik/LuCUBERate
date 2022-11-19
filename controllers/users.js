const db = require("../models");

const show = async (req, res) => {
  try {
    const populatedUser = await db.User.findById(req.params.id)
      .populate("categories")
      .populate("cubes");
    res.json(populatedUser);
  } catch (err) {
    console.log("Unable to populate cubes for user in cubes.create:", err);
    res.json({ Error: "Unable to populate cubes for user" });
  }
};

// const index = (req, res) => {
//   db.User.find({})
//     .then(foundUsers => {
//       res.json({ cubes: foundUsers });
//     })
//     .catch(err => {
//       console.log("Error in users.index:", err);
//       res.json({ Error: "Unable to get data" });
//     });
// };

// const create = (req, res) => {
//   db.User.create(req.body)
//     .then(savedUser => {
//       res.json({ user: savedUser });
//     })
//     .catch(err => {
//       console.log("Error in users.create:", err);
//       res.json({ Error: "Unable to create user" });
//     });
// };

const update = async (req, res) => {
  try {
    const updatedUser = await db.User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.log("Error in users.updatee:", err);
    res.json({ Error: "Unable to get data in users.update" });
  }
};

// const destroy = async (req, res) => {
//   try {
//     const deletedUser = await db.User.findByIdAndDelete(req.params.id);
//     res.json({ user: deletedUser });
//   } catch (err) {
//     console.log("Error in users.destroy:", err);
//     res.json({ Error: "Unable to get data" });
//   }
// };

module.exports = {
  // index,
  show,
  // create,
  update,
  // destroy,
};
