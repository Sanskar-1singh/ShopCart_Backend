const { StatusCodes } = require('http-status-codes');
const AppError=require('../errors/app-error');

class UserService{
    constructor(repository){
        this.repository=repository;
    }


    async getUsers(){
        try {
            const response=await this.repository.getUsers();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getUser(id){
        try {
            const response=await this.repository.getUser(id);
            return response;
        } catch (error) {
            throw error;            
        }
    }

    async createUser(data){
        try {
            const response=await this.repository.createUser({...data});
            return response;
        } catch (error) {
             if(error.name=='SequelizeValidationError'){
                let explanation=[];
                console.log(error);
                 error.errors.forEach((err)=>{
                    explanation.push(err.message);
                    explanation.push(err.value);
                 });
                 console.log("the explanation",explanation);
                 throw new AppError(explanation,StatusCodes.BAD_REQUEST);
             }
             if(error.name=='SequelizeUniqueConstraintError'){
                let explanation=[];
                console.log(error);
                 error.errors.forEach((err)=>{
                    explanation.push(err.message);
                    explanation.push(err.value);
                 });
                 console.log("the explanation",explanation);
                 throw new AppError(explanation,StatusCodes.BAD_REQUEST);
             }
             throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async destroyUser(id){
        try {
            const response=await this.repository.destroyUser(id);
            return response;
        } catch (error) {
             throw error;           
        }
    }
}

module.exports=UserService;