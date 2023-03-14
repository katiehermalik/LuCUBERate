const router = require("express").Router();
const passport = require("passport");
const { googleSuccessUrl, origin } = require("../config/multi-environment");

// /api/v1/oauth

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: googleSuccessUrl,
    failureRedirect: origin,
    failureMessage:
      "Sorry, we couldn't sign you in. It looks like you previously created an account with the same email address you're trying to use to sign in with 'Sign in with Google'. Please try signing in using the email and password you used to create your account. If you continue to experience issues, please contact our support team for assistance.",
  })
);

module.exports = router;
