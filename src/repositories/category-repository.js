const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const {category}=require('../models');
const logger = require('../config/logger-config');


class CategoryRepository{
    async getCategories(){
        try {
            const response=await category.findAl();
            if(response.length==0){
                throw new AppError('cannot fetched the categories in DB',StatusCodes.BAD_REQUEST);
            }
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
             if(error instanceof AppError){
                throw error;
             }
             throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCategory(id){
        try {
            const response=await category.findByPk(id);
            console.log("the response is",response);
            if(!response){
                throw new AppError('cannot fetched the category in DB',StatusCodes.BAD_REQUEST);
            }
            return response;
        } catch (error) {
            console.log(error);
             if(error instanceof AppError){
                throw error;
             }
             throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async createCategory(data){
            try {
                const response=await category.create(data);
                console.log("the resposne is",response);
                if(!response){
                    throw new AppError('cannot create the new category with same category name',StatusCodes.BAD_REQUEST);
                }
                return response;
            } catch (error) {
                console.log(error);
                if(error instanceof AppError){
                   throw error;
                }
                throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
            }
           
    }

    async destroy(categoryId){
        try {
            const response = await category.destroy({
                where: { id: categoryId }
            });
            console.log(response);
            if(response==0){
                throw new AppError('cannot fetched the category in DB',StatusCodes.BAD_REQUEST);
            }
            return response;
        } catch (error) {
            console.log(error);
             if(error instanceof AppError){
                throw error;
             }
             throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
       
    }

   
}

module.exports=CategoryRepository;