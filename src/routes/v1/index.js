const express=require('express');

const v1Router=express.Router();
const categoryRouter=require('./category-router');
const productrouter = require('./products-router');
const userrouter = require('./user-routes');
const cartrouter = require('./cart-router');
const orderRouter = require('./order-router');

v1Router.use('/categories',categoryRouter);
v1Router.use('/products',productrouter);
v1Router.use('/users',userrouter);
v1Router.use('/carts',cartrouter);
v1Router.use('/orders',orderRouter);

module.exports=v1Router;