
const CartRepository = require('../repositories/cart-repository');
const CartService=require('../services/cart-service');
const {StatusCodes}=require('http-status-codes');
const {SuccessReponse,ErrorReponse}=require('../utils/response-structure');
const cartService=new CartService(new CartRepository());

async function updateCart(req,res){
    try {
        const shouldAddProduct=(req.body.shouldAddProduct==true || req.body.shouldAddProduct=='true')?true:false;
        const response=await cartService.updateCart(req.params.id,req.body.productsId,shouldAddProduct);
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

module.exports={
    updateCart
}