const UserRepository=require('../repositories/user-repository');
const UserService=require('../services/user-service');
const {StatusCodes}=require('http-status-codes');
const {SuccessReponse,ErrorReponse}=require('../utils/response-structure');
const userService=new UserService(new UserRepository());

async function getUsers(req,res){
    try {
        const response=await userService.getUsers();
        SuccessReponse.message="Successfully fetched all Users";
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse); 
    } catch (error) {
          console.log(error);
          ErrorReponse.error=error;
          ErrorReponse.message='Something went wrong';
          
          return res.status( error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function getUser(req,res){
    try {
        const response=await userService.getUser(req.params.id);
        SuccessReponse.message="Successfully fetched User with given id";
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
          console.log(error);
          ErrorReponse.error=error;
          ErrorReponse.message='Something went wrong';
          
          return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function signup(req,res){
    try {
        const response=await userService.createUser(req.body);
        SuccessReponse.message="Successfully created User with given details";
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
          console.log(error);
          ErrorReponse.error=error;
          ErrorReponse.message='Something went wrong';
          
          return res.status( error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function signin(req,res){
    try {
        const response=await userService.signinUser(req.body);
        SuccessReponse.message='Successfully user has sign in with creadentials';
        SuccessReponse.data=response;
          
        res.cookie('x-access-token',response);
        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
        console.log(error);
        ErrorReponse.error=error;
        ErrorReponse.message='Soemthing went wrong';

        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

async function destroyUser(req,res){
    try {
        const response=await userService.destroyUser(req.params.id);
        SuccessReponse.message="Successfully deleted User with given details";
        SuccessReponse.data=response;

        return res.status(StatusCodes.OK).json(SuccessReponse);
    } catch (error) {
          console.log(error);
          ErrorReponse.error=error;
          ErrorReponse.message='Something went wrong';
          
          return res.status( error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
}

module.exports={
    getUsers,
    getUser,
    signup,
    destroyUser,
    signin
}