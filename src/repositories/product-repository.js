const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const {Product}=require('../models');
const logger = require('../config/logger-config');

class ProductRepository{

    async createProducts(data){
        try {
            const response=await Product.create(data);
            return response;
        } catch (error) {
            console.log(error);
              throw error;
        }
         
    }

    async getProducts(){
        try {
            const response=await Product.findAll();
        if(response.length==0){
            throw new AppError('cannot find any product in inventory',StatusCodes.BAD_REQUEST);
        }
        return response;
        } catch (error) {
              if(error instanceof AppError){
                throw error;
              }
              throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
        
    }

    async getProduct(id){

        try {
            const response=await  Product.findByPk(id);
            if(!response){
                 throw new AppError('cannot find product with given id',StatusCodes.BAD_REQUEST);
            }
            return response;
        } catch (error) {
            if(error instanceof AppError){
                throw error;
            }
            throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
       
    }

    async destroyProduct(productId){
        const response=await Product.destroy({
            where:{
                id:productId
            }
        });
        return response;
    }
}

module.exports=ProductRepository;