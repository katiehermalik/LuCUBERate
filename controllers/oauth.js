const db = require("../models");
const passport = require("passport");

const authenticate = (req, res) => {
  console.log("AUTHENTICATING");
  (() => {
    console.log("Hello");
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/oauth2/v3/userinfo"],
    });
  })();
};

const redirect = (req, res) => {
  console.log("REDIRECTING");
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
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
