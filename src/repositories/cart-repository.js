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

    async updateCart(userid,cartId,productId,shouldAddProduct){
        try {
             cartId=Number(cartId);
             productId=Number(productId);
             const checkpresenceproduct=await Product.findOne({
                where:{
                    id:productId
                }
             });
             const checkpresencecart=await Cart.findOne({
                where:{
                    id:cartId
                }
             });
             if(!checkpresencecart){
                throw new AppError('request with cart id is not found in DB',StatusCodes.NOT_FOUND);
             }

             if(!checkpresenceproduct){
                throw new AppError('product with given id is not present in inventory',StatusCodes.NOT_FOUND);
             }

             if(checkpresencecart.UserId!=userid){
                throw new AppError('user is not authorised to update the cart',StatusCodes.UNAUTHORIZED);
             }
             console.log("hello")
             console.log(typeof cartId,typeof productId)
            const result=await cart_products.findOne({
                where:{
                    [Op.and]:[
                        {cartId:cartId},
                        {productsId:productId}
                    ]
                },
            });
            console.log(shouldAddProduct)
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

    async getcartwithProducts(Cartid,UserIdclient){
        try {

         const cartcheck=await Cart.findOne({
            where:{
                id:Cartid
            }
         });

         if(!cartcheck){
            throw new AppError('Cart did not exits',StatusCodes.NOT_FOUND);
         }

         if(cartcheck.UserId!=UserIdclient){
                throw new AppError('User with cart id is not authorised',StatusCodes.UNAUTHORIZED);
         }
            const response=await cart_products.findAll({
                where:{
                    cartId:Cartid
                }
            });
                return response;

        } catch (error) {
            console.log(error);
            if(error instanceof AppError){
                throw error;
            }
            throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

   async clearCart(cartid,userid){
    try {
         
        const cartcheck=await  Cart.findOne({
            where:{
                id:cartid
            }
        });
         
        if(!cartcheck){
            throw new AppError('cart did not exitsin Db',StatusCodes.NOT_FOUND);
        }

        if(cartcheck.UserId!=userid){
            throw new AppError('User not authorised to do this',StatusCodes.UNAUTHORIZED);
        } 
        const response=await cart_products.destroy({
            where:{
                cartId:cartid
            }
        });
        return response;
    } catch (error) {
        if(error instanceof AppError){
            throw error;
        }
        throw new AppError('Somrthing went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
   }
}

module.exports=CartRepository;