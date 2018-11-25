const router = require('express').Router();
const userCtrl = require('./user.ctrl');

router.route('/').post(userCtrl.sendPost);

module.exports = router;
