const express=require('express');
const { pingController } = require('../../controllers');

const router=express.Router();

router.get('/ping',pingController.pingcheck);

module.exports=router;