import certFunc from '../../middleware/cert';

const router = require('express').Router();
const adminCtrl = require('./admin.ctrl');
const cert = require('./cert');

router.route('/post').post(certFunc, adminCtrl.getPost);
router.route('/reject').post(certFunc, adminCtrl.reject);
router.route('/allow/:idx').get(certFunc, adminCtrl.allow);
router.route('/count/:type').get(certFunc, adminCtrl.count);
router.use('/cert', cert);

module.exports = router;
