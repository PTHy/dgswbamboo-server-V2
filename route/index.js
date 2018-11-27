const router = require('express').Router();
const user = require('./user');
const admin = require('./admin');
const upload = require('./upload');

router.use('/user', user);
router.use('/admin', admin);
router.use('/upload', upload);

module.exports = router;
