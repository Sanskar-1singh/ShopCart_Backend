const express=require('express');

const {createOrder, fetchOrderDeatils}=require('../../controllers/order-controller');
const { isAuthenticated } = require('../../middlewares/auth-middlewares');


const orderRouter=express.Router();

orderRouter.post('/',isAuthenticated,createOrder);
orderRouter.get('/:id',isAuthenticated,fetchOrderDeatils);

module.exports=orderRouter;