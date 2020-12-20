const router = require('express').Router();
const ctrl = require('../controllers');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./lucuberate-client/public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
    }
  }
});

// routes - /api/v1/cubes
router.get("/", ctrl.cubes.index);
router.get("/:id", ctrl.cubes.show);
router.post("/", upload.single('visual_aid'), ctrl.cubes.create);
router.put("/:id", upload.single('visual_aid'), ctrl.cubes.update);
router.delete("/:id", ctrl.cubes.destroy);

module.exports = router;