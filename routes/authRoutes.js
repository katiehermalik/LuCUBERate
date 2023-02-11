const router = require("express").Router();
const passport = require("passport");
const ctrl = require("../controllers");

// /api/v1/auth

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { failureRedirect: "/" },
    (err, user, errorMessage) => {
      if (err) next(err);
      if (!user) {
        return res.json(errorMessage);
      }
      req.logIn(user, err => {
        if (err) next(err);
        return res.json(req.user);
      });
    }
  )(req, res, next);
});

router.post("/signup", (req, res, next) => {
  passport.authenticate(
    "local",
    { failureRedirect: "/" },
    (err, user, errorMessage) => {
      if (err) next(err);
      if (!user) {
        return res.json(errorMessage);
      }
      req.logIn(user, err => {
        if (err) next(err);
        return res.json(req.user);
      });
    }
  )(req, res, next);
});

router.delete("/logout", ctrl.auth.logout);

module.exports = router;
