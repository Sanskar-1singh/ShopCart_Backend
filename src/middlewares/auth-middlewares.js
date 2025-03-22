const { StatusCodes } = require("http-status-codes");
const { ErrorReponse } = require("../utils/response-structure");
const {verifyToken}=require('../utils/auth');


function isAuthenticated(req,res,next){
    const token=req.cookies['token'];
    console.log(token);
    if(!token){
        ErrorReponse.message='Missing JWT token';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    try {
        const decodejwttoken=verifyToken(token);
        console.log(decodejwttoken);
    } catch (error) {
        ErrorReponse.error=error;
        ErrorReponse.message='Invalid JWT token';

        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    
    next();
}

module.exports={
    isAuthenticated
}