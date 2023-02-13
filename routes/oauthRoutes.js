const router = require("express").Router();
const passport = require("passport");
const {
  googleSuccessUrl,
  googleFailedUrl,
} = require("../config/multi-environment");

// /api/v1/oauth

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: googleSuccessUrl,
    failureRedirect: googleFailedUrl,
    failureMessage: "Cannot login with Goggle, please try again.",
  })
);

module.exports = router;
