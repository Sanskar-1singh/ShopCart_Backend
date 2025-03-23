const express=require('express');

const {createOrder}=require('../../controllers/order-controller');
const { isAuthenticated } = require('../../middlewares/auth-middlewares');


const orderRouter=express.Router();

orderRouter.post('/',isAuthenticated,createOrder);

module.exports=orderRouter;