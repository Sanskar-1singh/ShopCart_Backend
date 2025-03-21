
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
        const response=await productservice.getProducts(req.query);
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


async function destroy(req,res){
    try {
        const response=await productservice.destroy(req.params.id);
        SuccessReponse.message='Successfully deleted the products';
        SuccessReponse.data=response
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log("error is",error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function getProductForCategory(req,res){
    try {
        const response=await productservice.getProductWithCategory(req.params.id);
        SuccessReponse.message='Successfully fetched the products with given category ID';
        SuccessReponse.data=response
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log("error is",error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}


async function searchProduct(req,res){
    try {
        console.log("controller hit")
        console.log(req.query.search)
        const response=await productservice.searchProduct(req.query.search);
        SuccessReponse.message='Successfully fetched the product with given search params';
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log("the error is",error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

module.exports={
    createProducts,
    getProduct,
    getProducts,
    destroy,
    getProductForCategory,
    searchProduct
}