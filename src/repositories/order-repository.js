const {Order,Order_products,Product}=require('../models');

class OrderRepository{
    async getOrders(){
        try {
            const response=await Order.findAll();
            return response; 
        } catch (error) {
                throw error;
        }
    }

    async getOrder(id){
        try {
            const response=await Order.findByPk(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    async createOrder(userId_data){
        try {
            const response=await Order.create({
                userId:userId_data,
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async addOrderProductInBulk(ordersProducts){
        try {
            const response=await Order_products.bulkCreate(ordersProducts);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async fetchOrderdetails(userId,orderId){
        try {
            const response=await Order.findAll({
                 where:{
                    id:orderId
                 },
                 include:[
                    {
                        model:Product,
                        attributes:['title','id','price','image'],
                        through:{
                            model:Order_products,
                            attributes:['quantity']
                        }
                    }
                 ],
                 attributes:['id','status','createdAt','updatedAt'] 
            });
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=OrderRepository;