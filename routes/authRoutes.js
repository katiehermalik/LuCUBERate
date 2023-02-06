const router = require("express").Router();
const ctrl = require("../controllers");

// /api/v1/auth
router.post("/signup", ctrl.auth.signup);
router.post("/login", ctrl.auth.login);
router.delete("/logout", ctrl.auth.logout);

module.exports = router;
