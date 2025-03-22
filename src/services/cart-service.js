class CartService{
    constructor(repository){
        this.repository=repository;
    }
    async updateCart(cartId,productId,shouldAddProduct){
        try {
            const response=await this.repository.updateCart(cartId,productId,shouldAddProduct);
            return response;
        } catch (error) {
             console.log(error);
             throw error;
        }
    }
}

module.exports=CartService;