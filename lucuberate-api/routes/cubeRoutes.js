const router = require('express').Router();
const ctrl = require('../controllers');

// routes - /api/v1/cubes
router.get("/", ctrl.cubes.index);
router.get("/:id", ctrl.cubes.show);
router.post("/", ctrl.cubes.create);
router.put("/:id", ctrl.cubes.update);
router.delete("/:id", ctrl.cubes.destroy);

module.exports = router;