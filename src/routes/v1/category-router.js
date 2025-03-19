const express=require('express');
const {createCategory,getCategories,getCategory}=require('../../controllers/category-controller');
const categoryRouter=express.Router();

categoryRouter.post('/',createCategory);
categoryRouter.get('/:id',getCategory);
categoryRouter.get('/',getCategories);

module.exports=categoryRouter;