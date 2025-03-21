const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const {Product,category}=require('../models');
const logger = require('../config/logger-config');
const { Model, Op } = require('sequelize');

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

    async getProducts(query){
        let customfilter={};
        console.log("Query received:", query);

        if (query.price) {
            let obj=[];
             obj = query.price.split("-");
             console.log(obj)
            let minPrice=Number(obj[0]);
            let maxPrice=Number(obj[1]);
          if(isNaN(minPrice)){
            minPrice=undefined;
          }
          if(isNaN(maxPrice)){
            maxPrice=undefined;
          }
            customfilter.price = {
                [Op.between]: [((minPrice==undefined)?0:minPrice),((maxPrice==undefined)?1:maxPrice)]
            };
        }
        try {
            const queryOptions = {
                include: [
                    {
                        model: category,
                        required: true,
                        as:'category_of_products'
                    }
                ],
            };
          
            // Apply pagination only if limit is provided
            if (!isNaN(+query.limit)) {
                queryOptions.limit = +query.limit;
                queryOptions.offset = +query.offset || 0;
            }
             
            if(isNaN(+query.limit) && !isNaN(+query.offset)){
                queryOptions.offset = +query.offset;
            }
           queryOptions.where=customfilter;
            const response = await Product.findAll(queryOptions);
    
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
        const response=await Product.destroy({
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