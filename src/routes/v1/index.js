const express=require('express');

const v1Router=express.Router();
const categoryRouter=require('./category-router');

v1Router.use('/categories',categoryRouter);

module.exports=v1Router;