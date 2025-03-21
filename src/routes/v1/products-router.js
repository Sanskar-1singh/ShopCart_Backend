const express=require('express');

const productrouter=express.Router();
const {createProducts,getProduct,getProducts,destroy,getProductForCategory,searchProduct}=require('../../controllers/product-controllers');

productrouter.get('/',getProducts);
productrouter.get('/:id',getProduct);
productrouter.post('/',createProducts);
productrouter.delete('/:id',destroy);
productrouter.get('/categoryId/:id',getProductForCategory);

productrouter.get('/search/product',searchProduct);

module.exports=productrouter;
