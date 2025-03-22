const {Cart}=require('../models');
const AppError=require('../errors/app-error');
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

}

module.exports=CartRepository;