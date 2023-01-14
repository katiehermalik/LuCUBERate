const router = require("express").Router();
const ctrl = require("../controllers");

// routes - /oauth
router.get("/google", ctrl.oauth.authenticate);
router.get("/google/callback", ctrl.oauth.redirect);
router.get("/login/failed", ctrl.oauth.failure);
router.get("/login/success", ctrl.oauth.success);

module.exports = router;
