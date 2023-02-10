const router = require("express").Router();
const passport = require("passport");
const ctrl = require("../controllers");

// /api/v1/auth
// router.post("/signup", ctrl.auth.signup);
// router.post("/login", ctrl.auth.login);
// router.delete("/logout", ctrl.auth.logout);

router.post(
  "/signup",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => res.json(req.user)
);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    res.json(req.user);
  }
);
router.delete("/logout", ctrl.auth.logout);

module.exports = router;
