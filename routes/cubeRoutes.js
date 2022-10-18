const router = require('express').Router();
const ctrl = require('../controllers');
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
const path = require('path');


  const s3 = new AWS.S3({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
  });

//   s3.deleteObject({ Bucket: 'bucket-name', Key: 'image.jpg' }, (err, data) => {
//     console.error(err);
//     console.log(data);
// });

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'lucuberatebucket',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuid()}${ext}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
      }
    }
  })

// routes - /api/v1/cubes

router.get("/", ctrl.cubes.index);
router.get("/:id", ctrl.cubes.show);
router.post("/", upload.single('visual_aid'), ctrl.cubes.create);
router.put("/:id", upload.single('visual_aid'), ctrl.cubes.update);
router.delete("/:id", ctrl.cubes.destroy);


module.exports = {
  router,
  s3
}

