class CartService{
    constructor(repository){
        this.repository=repository;
    }
    async updateCart(userid,cartId,productId,shouldAddProduct){
        try {
            const response=await this.repository.updateCart(userid,cartId,productId,shouldAddProduct);
            return response;
        } catch (error) {
             console.log(error);
             throw error;
        }
    }

    async getcartwithproducts(cartId,userId){
        try {
            const response=await this.repository.getcartwithProducts(cartId,userId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async clearCartProducts(cartid,userid){
        try {
            const response=await this.repository.clearCart(cartid,userid);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=CartService;