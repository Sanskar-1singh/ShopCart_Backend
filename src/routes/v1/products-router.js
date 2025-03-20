const express=require('express');

const productrouter=express.Router();
const {createProducts,getProduct,getProducts}=require('../../controllers/product-controllers');

productrouter.get('/',getProducts);
productrouter.get('/:id',getProduct);
productrouter.post('/',createProducts);

module.exports=productrouter;
