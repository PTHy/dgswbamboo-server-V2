const router = require('express').Router();
const controller = require('./cert.ctrl');
const certFunc = require('../../../middleware/cert');

router.route('/signup').post(certFunc, controller.signup);
router.route('/signin').post(controller.signin);

module.exports = router;
