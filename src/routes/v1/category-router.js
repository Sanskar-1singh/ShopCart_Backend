const express=require('express');
const {createCategory,getCategories,getCategory,destroyCategories}=require('../../controllers/category-controller');
const { categoryValidator } = require('../../middlewares/categories-middlewares');
const categoryRouter=express.Router();

categoryRouter.post('/',categoryValidator,createCategory);
categoryRouter.get('/:id',getCategory);
categoryRouter.get('/',getCategories);
categoryRouter.delete('/:id',destroyCategories)

module.exports=categoryRouter;