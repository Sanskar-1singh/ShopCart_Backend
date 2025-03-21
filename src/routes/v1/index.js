const express=require('express');

const v1Router=express.Router();
const categoryRouter=require('./category-router');
const productrouter = require('./products-router');
const userrouter = require('./user-routes');

v1Router.use('/categories',categoryRouter);
v1Router.use('/products',productrouter);
v1Router.use('/users',userrouter);

module.exports=v1Router;