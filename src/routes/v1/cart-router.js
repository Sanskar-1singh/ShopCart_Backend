const express=require('express');

const {updateCart, getCartWithProducts, clearCart}=require('../../controllers/cart-controller');
const {isAuthenticated}=require('../../middlewares/auth-middlewares');

const cartrouter=express.Router();

cartrouter.patch('/:id',isAuthenticated,updateCart);
cartrouter.get('/:id/products',isAuthenticated,getCartWithProducts);
cartrouter.delete('/:id',isAuthenticated,clearCart);

module.exports=cartrouter;