const {StatusCodes}=require('http-status-codes');
const categoryService=require('../services/category-service');
const categoryRepository=require('../repositories/category-repository');
const { SuccessReponse, ErrorReponse } =require('../utils/response-structure');
const categoryservice=new categoryService(new categoryRepository());



async function createCategory(req,res){
    try {
        const response=await categoryservice.createCategory(req.body);
           SuccessReponse.message='successfully created category';
            SuccessReponse.data=response;
        return res.status(StatusCodes.CREATED).json(
            SuccessReponse
        )
    } catch (error) {
           console.log("the error is from cont",error);
           ErrorReponse.error=error;
           ErrorReponse.message='Something went wrong';
           return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(
              ErrorReponse
           )
    }
}


async function getCategories(req,res){
    try {
        const response=await  categoryservice.getCategories();
        if(response){
            SuccessReponse.message="successfully fetched all the details of products";
            SuccessReponse.data=response;
        }
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function getCategory(req,res){
    try {
        const response=await  categoryservice.getCategory(req.params.id);
        if(response){
            SuccessReponse.message="successfully fetched the details of products";
            SuccessReponse.data=response;
        }
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function destroyCategories(req,res){
    try {
        const response=await categoryservice.destroy(req.params.id);
        SuccessReponse.message='Successfully deleted the categories with given id';
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Something went wrong';
        return  res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

module.exports={
    createCategory,
    getCategories,
    getCategory,
    destroyCategories
}