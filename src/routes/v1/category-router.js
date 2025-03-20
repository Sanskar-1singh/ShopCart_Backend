const express=require('express');
const {createCategory,getCategories,getCategory,destroyCategories, getProductwithcategory}=require('../../controllers/category-controller');
const { categoryValidator } = require('../../middlewares/categories-middlewares');
const categoryRouter=express.Router();

categoryRouter.post('/',categoryValidator,createCategory);
categoryRouter.get('/:id',getCategory);
categoryRouter.get('/',getCategories);
categoryRouter.delete('/:id',destroyCategories);
categoryRouter.get('/:id/products',getProductwithcategory);

module.exports=categoryRouter;