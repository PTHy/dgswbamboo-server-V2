const adminCtrl = require('./admin.ctrl');
const router = require('express').Router();

router.route('/reject').post(adminCtrl.reject);

module.exports = router