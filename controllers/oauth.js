const db = require("../models");

const user = async (req, res) => {
  try {
    const populatedUser = await db.User.findById(req.user._id)
      .populate("categories")
      .populate("cubes");
    res.json(populatedUser);
  } catch (err) {
    console.log("Unable to populate user in oauth.user", err);
    res.json({ Error: "Unable to populate user in oauth.user" });
  }
};

module.exports = { user };
