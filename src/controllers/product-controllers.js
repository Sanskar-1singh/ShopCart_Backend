
const ProductService=require('../services/products-service');
const ProductRepository=require('../repositories/product-repository');
const {StatusCodes}=require('http-status-codes');

const {SuccessReponse,ErrorReponse}=require('../utils/response-structure');


const productservice=new ProductService(new ProductRepository());

async function createProducts(req,res){
    try {
         const response=await productservice.createProduct(req.body);
         SuccessReponse.message='Successfully created a products with provided data';
         SuccessReponse.data=response
         return res.status(StatusCodes.CREATED).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function getProduct(req,res){
    try {
        const response=await productservice.getProduct(req.params.id);
        SuccessReponse.message='Successfully fetched a products with provided id';
         SuccessReponse.data=response
         return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function getProducts(req,res){
    try {
        const response=await productservice.getProducts();
        SuccessReponse.message='Successfully fetched all products';
        SuccessReponse.data=response
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

module.exports={
    createProducts,
    getProduct,
    getProducts
}