
const CartRepository = require('../repositories/cart-repository');
const CartService=require('../services/cart-service');
const {StatusCodes}=require('http-status-codes');
const {SuccessReponse,ErrorReponse}=require('../utils/response-structure');
const cartService=new CartService(new CartRepository());

async function updateCart(req,res){
    try {
        const shouldAddProduct=(req.body.shouldAddProduct==true || req.body.shouldAddProduct=='true')?true:false;
        const response=await cartService.updateCart(req.user.id,req.params.id,req.body.productsId,shouldAddProduct);
        SuccessReponse.message="Successfully updated cart with details";
        SuccessReponse.data=response;

        return res.status(StatusCodes.CREATED).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.message='Something went wrong';
        ErrorReponse.data=error;
        
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}


async function getCartWithProducts(req,res){
    try {
        const response=await cartService.getcartwithproducts(req.params.id,req.user.id);
        SuccessReponse.message='Successfully fetched all the products present in cart';
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        ErrorReponse.message='Something went wrong';
        ErrorReponse.data=error;

        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function clearCart(req,res){
    try {
        console.log(req.params.id,req.user.id)
        const response=await cartService.clearCartProducts(req.params.id,req.user.id);
        SuccessReponse.message='Successfully deleted all the product from cart';
        SuccessReponse.data=response;
        
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        ErrorReponse.message='Soemthing went wrong';
        ErrorReponse.data=error;

        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}
module.exports={
    updateCart,
    getCartWithProducts,
    clearCart
}