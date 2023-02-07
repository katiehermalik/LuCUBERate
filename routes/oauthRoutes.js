const router = require("express").Router();
const passport = require("passport");
// const ctrl = require("../controllers");
const db = require("../models");

let successLoginUrl;
let errorLoginURL;
if (process.env.NODE_ENV === "production") {
  successLoginUrl = "https://www.lucuberate.com/login/success";
  errorLoginURL = "https://www.lucuberate.com/login/success";
} else {
  successLoginUrl = "http://localhost:3000/login/success";
  errorLoginURL = "http://localhost:3000/login/failed";
}

// /api/v1/oauth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: successLoginUrl,
    failureRedirect: errorLoginURL,
    failureMessage: "Cannot login with Goggle, please try again.",
  })
);
router.get("/user", async (req, res) => {
  try {
    const populatedUser = await db.User.findById(req.user._id)
      .populate("categories")
      .populate("cubes");
    res.json(populatedUser);
  } catch (err) {
    console.log("Unable to populate cubes for user in cubes.create:", err);
    res.json({ Error: "Unable to populate cubes for user" });
  }
});

module.exports = router;
