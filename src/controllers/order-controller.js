
const {StatusCodes}=require('http-status-codes');
const OrderService=require('../services/order-service');
const {SuccessReponse,ErrorReponse}=require('../utils/response-structure');
const OrderRepository=require('../repositories/order-repository.js');
const CartRepository=require('../repositories/cart-repository');

const orderservice=new OrderService(new OrderRepository(),new CartRepository());

async function createOrder(req,res){
    try {
        const response=await orderservice.createOrder(req.user.id);

        SuccessReponse.message="Successfully placed order for items present in cart";
        SuccessReponse.data=response;

        return res.status(StatusCodes.CREATED).json(SuccessReponse);
    } catch (error) {
        ErrorReponse.message='Something went wrong';
        ErrorReponse.data=error;

        return res.status(error.StatusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

module.exports={
    createOrder
}