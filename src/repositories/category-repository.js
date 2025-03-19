const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const {category}=require('../models');


class CategoryRepository{
    async getCategories(){
        try {
            const response=await category.findAll();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCategory(id){
        try {
            const response=await category.findByPk(id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
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
                throw error;
            }
           
    }
}

module.exports=CategoryRepository;