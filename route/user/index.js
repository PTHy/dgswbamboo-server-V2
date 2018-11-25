const router = require('express').Router();
const userCtrl = require('./user.ctrl');

router.route('/post').post(userCtrl.sendPost);
router.route('/post/:count').get(userCtrl.getPost);
router.route('/count').get(userCtrl.count);

module.exports = router;
