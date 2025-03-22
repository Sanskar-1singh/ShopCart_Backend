const express=require('express');

const {updateCart}=require('../../controllers/cart-controller');
const {isAuthenticated}=require('../../middlewares/auth-middlewares');

const cartrouter=express.Router();

cartrouter.patch('/:id',isAuthenticated,updateCart);

module.exports=cartrouter;