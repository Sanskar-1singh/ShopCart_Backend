const { StatusCodes } = require('http-status-codes');
const AppError=require('../errors/app-error');
const bcrypt=require('bcrypt');
const { generateToken } = require('../utils/auth');

class UserService{
    constructor(repository,cartrepository){
        this.repository=repository;
        this.cartrepository=cartrepository;
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
            console.log(response.id);
            const makingCart=await this.cartrepository.createcart({ UserId: response.id });
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


    async signinUser(data){
        try {
            const response=await this.repository.getUserByemail(data.email); 
            if(!response){
               throw new AppError('User did not found in DB',StatusCodes.NOT_FOUND);
            }
              const ispasswordMatch=bcrypt.compareSync(data.password,response.password);
              console.log("hello",response)
              if(!ispasswordMatch){
                 throw new AppError('Password did not match.TRY AGAIN',StatusCodes.BAD_REQUEST);
              }
              const token = generateToken({ email: response.email, id: response.id });
              return token;

        } catch (error) {
             if(error instanceof AppError){
                throw error;
             }
             throw new AppError('Soemthing went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
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