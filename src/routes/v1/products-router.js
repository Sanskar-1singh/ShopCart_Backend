const express=require('express');

const productrouter=express.Router();
const {createProducts,getProduct,getProducts,destroy}=require('../../controllers/product-controllers');

productrouter.get('/',getProducts);
productrouter.get('/:id',getProduct);
productrouter.post('/',createProducts);
productrouter.delete('/:id',destroy);

module.exports=productrouter;
