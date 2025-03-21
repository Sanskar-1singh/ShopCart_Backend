const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app-error');
const {Users}=require('../models/index');

class UserRepository{

    async getUsers(){
        try {
            const response=await Users.findAll();
            if(response.length==0){
                throw new AppError('no user is found in databases',StatusCodes.BAD_REQUEST);
            }
        return response;
        } catch (error) {
            if(error instanceof AppError){
                throw error;
            }
            throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getUser(id){
        try {
            const response=await Users.findByPk(id);
            if(!response){
                throw new AppError('user not found with given id',StatusCodes.BAD_REQUEST);
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

    async createUser(data){
        try {
            const response=await Users.create(data);
            return response;
        } catch (error) {
            console.log(error);
             throw error;
        }
    }

    async destroyUser(Userid){
        try {
            const response=await Users.destroy({
                where:{
                    id:Userid
                }
            });
             if(!response){
                throw new AppError('No user is found with given id to delete',StatusCodes.BAD_REQUEST);
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
}

module.exports=UserRepository;