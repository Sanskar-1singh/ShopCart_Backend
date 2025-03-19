const {StatusCodes}=require('http-status-codes');

const {SuccessReponse,ErrorReponse}=require('../utils/response-structure');
const AppError = require('../errors/app-error');

function categoryValidator(req,res,next){
    if(!req.body.name){
        ErrorReponse.message="Name is missing from request body";
        ErrorReponse.error=new AppError('name is missing from body',StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    if(!req.body.description){
        ErrorReponse.message="description is missing from request body";
        ErrorReponse.error=new AppError('description is missing from body',StatusCodes.BAD_REQUEST);
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    next();
}

module.exports={
    categoryValidator,
}