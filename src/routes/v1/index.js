const express=require('express');

const v1Router=express.Router();
const categoryRouter=require('./category-router');
const productrouter = require('./products-router');

v1Router.use('/categories',categoryRouter);
v1Router.use('/products',productrouter)

module.exports=v1Router;