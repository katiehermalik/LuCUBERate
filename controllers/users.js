const db = require("../models");

const userData = async (req, res) => {
  try {
    const populatedUser = await db.User.findById(req.user._id)
      .populate("categories")
      .populate("cubes");
    res.json({
      userData: populatedUser,
      isAuth: req.isAuthenticated(),
      session: req.session,
    });
  } catch (err) {
    console.log("Unable to populate user in users.userData:", err);
    res.json({ Error: "Unable to populate user" });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await db.User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true }
    )
      .populate("categories")
      .populate("cubes");
    res.json(updatedUser);
  } catch (err) {
    console.log("Error in users.update:", err);
    res.json({ Error: "Unable to get data in users.update" });
  }
};

// const destroy = async (req, res) => {
//   try {
//     const deletedUser = await db.User.findByIdAndDelete(req.user._id);
//     res.json({ user: deletedUser });
//   } catch (err) {
//     console.log("Error in users.destroy:", err);
//     res.json({ Error: "Unable to get data" });
//   }
// };

module.exports = {
  userData,
  update,
  // destroy,
};
