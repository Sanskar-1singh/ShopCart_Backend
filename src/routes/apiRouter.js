const express=require('express');
const pingRoutesv1=require('./v1/ping-routesv1');
const pingRoutesv2=require('./v2/ping-routesv2');

const router=express.Router();

router.use('/v1',pingRoutesv1);
router.use('/v2',pingRoutesv2);

module.exports=router;