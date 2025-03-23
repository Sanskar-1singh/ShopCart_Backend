const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");
const order = require("../models/order");

class OrderService{
    constructor(respository,cartrepository){
        this.respository=respository;
        this.cartrepository=cartrepository;
    }

    async getOrders(){
        try {
            const response=await this.respository.getOrders();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getOrder(id){
        try {
            const response=await this.respository.getOrder(id);
            return response;
        } catch (error) {
             throw error;
        }
    }

    async createOrder(userId){
        try {

            //check if cart is present for user or not
            const cart=await this.cartrepository.getcartbyuser(userId);
            if(!cart){
                throw new AppError('cart is not present w.r.t to userID',StatusCodes.BAD_REQUEST);
            }
            //fetch all the product present in the cart
            const cartproduct=await this.cartrepository.getcartwithProducts(cart.id,userId);

            //if cart is empty then we cannot place any order
            if(cartproduct.length==0){
                throw new AppError('cart is empty cannot place order',StatusCodes.BAD_REQUEST);
            }
            //create a new empty order
            const order=await this.respository.createOrder(userId);

            //for the above order,add order products
             console.log(cartproduct)
            const orderproductbulkcreatearray=cartproduct.map(product=>{
                console.log(product.quantity)
                return{
                   OrderId:order.id,
                   ProductId:product.productsId,
                   quantity:product.quantity
                }
            });
           console.log(orderproductbulkcreatearray)
            const orderproducts=await this.respository.addOrderProductInBulk(orderproductbulkcreatearray);

            order.status="SUCCESSFULL";
            await order.save();

            await this.cartrepository.clearCart(cart.id,userId);

            return {
                orderId:order.id,
                products:orderproducts 
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports=OrderService;