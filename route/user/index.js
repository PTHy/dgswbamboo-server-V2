const userCtrl = require('./user.ctrl');
const router=require('express').Router();

router.route('/').post(userCtrl.sendPost);

module.exports=router