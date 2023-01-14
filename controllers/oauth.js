const db = require("../models");
const passport = require("passport");

const authenticate = () => {
  console.log("AUTHENTICATING");
  passport.authenticate("google", { scope: ["profile"] });
};

const redirect = () => {
  console.log("REDIRECTING");
  passport.authenticate("google", {
    successRedirect: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    failureRedirect: "/login/failed",
  });
};

const failure = (req, res) => {
  console.log("FAILED TO LOGIN");
  res.status(401).json({
    success: false,
    message: "user failed to authenticate",
  });
};

const success = (req, res) => {
  console.log("LOGIN SUCCESS");
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
  }
};

module.exports = {
  authenticate,
  redirect,
  failure,
  success,
};
