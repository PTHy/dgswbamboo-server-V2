const router = require('express').Router();
const adminCtrl = require('./admin.ctrl');

router.route('/reject').post(adminCtrl.reject);
router.route('/allow').post(adminCtrl.allow);
router.route('/count/:type').get(adminCtrl.count);

module.exports = router;
