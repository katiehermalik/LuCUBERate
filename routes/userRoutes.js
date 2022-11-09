const router = require("express").Router();
const ctrl = require("../controllers");

// routes - /api/v1/users
// router.get("/", ctrl.users.index);
router.get("/:id", ctrl.users.show);
// router.post("/", ctrl.users.create);
router.put("/:id", ctrl.users.update);
router.delete("/:id", ctrl.users.destroy);

module.exports = router;
