const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const {Product,category}=require('../models');
const logger = require('../config/logger-config');
const { Model } = require('sequelize');

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
            const response=await Product.findAll({
                include:[
                    {
                        model:category,
                        required:true,
                        as:'category_of_products'
                    }
                ]
            });
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
      try {
        const response=await Product.destry({
            where:{
                id:productId
            }
        });
        if(response==0){
            throw new AppError('cannot find product to delete with given id  in inventory',StatusCodes.BAD_REQUEST);
        }
        return response;
      } catch (error) {
        if(error instanceof AppError){
            throw error;
        }
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
      }
        
    }

    async getProductForCategory(categoryId){
        try {
            const response=await Product.findAll({
                where:{
                    category_id:categoryId,
                }
            });
            console.log(response)
            if(response.length==0){
                throw new AppError('cannot find products with category id',StatusCodes.BAD_REQUEST);
            }
            return response;
        } catch (error) {
            if(error instanceof AppError){
                throw error;
            }
            throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports=ProductRepository;