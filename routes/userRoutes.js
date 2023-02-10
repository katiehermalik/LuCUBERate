const router = require("express").Router();
const ctrl = require("../controllers");

// routes - /api/v1/users

router.get("/currentuser", ctrl.users.userData);
router.put("/currentuser/update", ctrl.users.update);
// router.delete("/:id", ctrl.users.destroy);

module.exports = router;
