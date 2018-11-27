const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid4');
const imageCtrl = require('./image.ctrl');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/');
    },
    filename(req, file, cb) {
      cb(null, uuid() + path.extname(file.originalname));
    },
  }),
});

router.route('/').post(upload.array('img'), imageCtrl.UploadImg);

module.exports = router;
