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
}

module.exports=CartService;