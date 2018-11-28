const router = require('express').Router();
const controller = require('./cert.ctrl');

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

module.exports = router;
