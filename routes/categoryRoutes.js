const router = require("express").Router();
const ctrl = require("../controllers");

// routes - /api/v1/categories
// router.get("/", ctrl.categories.index);
// router.get("/:id", ctrl.categories.show);
router.post("/", ctrl.categories.create);
router.delete("/:id", ctrl.categories.destroy);
router.put("/:id", ctrl.categories.shuffle);

module.exports = router;
