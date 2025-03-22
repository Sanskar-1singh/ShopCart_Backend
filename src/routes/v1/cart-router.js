const express=require('express');

const {updateCart}=require('../../controllers/cart-controller');

const cartrouter=express.Router();

cartrouter.patch('/:id',updateCart);

module.exports=cartrouter;