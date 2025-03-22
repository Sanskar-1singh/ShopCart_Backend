const {Cart,cart_products,Product}=require('../models');
const AppError=require('../errors/app-error');
const { Op, where } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
class CartRepository{
     
    async getCarts(){
        try {
            const response=await Cart.findAll();
            if(response.length==0){
                throw new AppError('no carts is found in databases',StatusCodes.BAD_REQUEST);
            }
        return response;
        } catch (error) {
            if(error instanceof AppError){
                throw error;
            }
            throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

 

    async getCart(id){
        try {
            const response=await Cart.findByPk(id);
            if(!response){
                throw new AppError('cart not found with given id',StatusCodes.BAD_REQUEST);
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

    async createcart(data){
        try {
            const response=await Cart.create(data);
            return response;
        } catch (error) {
            console.log(error);
             throw error;
        }
    }

    async updateCart(cartId,productId,shouldAddProduct){
        try {
             cartId=Number(cartId);
             productId=Number(productId);
             const checkpresenceproduct=await Product.findOne({
                where:{
                    id:productId
                }
             });
             if(!checkpresenceproduct){
                throw new AppError('product with given id is not present in inventory',StatusCodes.NOT_FOUND);
             }
             console.log(typeof cartId,typeof productId)
            const result=await cart_products.findOne({
                where:{
                    [Op.and]:[
                        {cartId:cartId},
                        {productsId:productId}
                    ]
                },
            });
            
            if(shouldAddProduct){
                //we want to add product to cart
                if(!result){
                    //the product was not yet added in the cart
                    await cart_products.create({
                        cartId:cartId,
                        productsId:productId
                    }); 
                }
                else{
                    //the product was already in the cart and we want to increment the quantity
                    await result.increment({quantity:1});
                }
            }
            else{
                //remove product from cart
                if(!result){
                    throw new AppError('product with product id is not found in cart',StatusCodes.NOT_FOUND);
                }
                if(result.quantity==1){
                    await cart_products.destroy({
                        where:{
                            [Op.and]:[
                                {cartId:cartId},
                                {productsId:productId}
                            ]
                        }
                    });
                }
                else{
                    await result.increment({quantity:-1});
                }
            }

            const response=await cart_products.findAll({
                where:{
                     [Op.and]:[
                        {cartId:cartId},
                     ]
                },
            });
          console.log(response)
            return {
                cartId:cartId,
                products:response
            }
        } catch (error) {
            console.log(error);
            if(error instanceof AppError){
                throw error;
            }
            throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports=CartRepository;