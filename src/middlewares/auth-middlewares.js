const { StatusCodes } = require("http-status-codes");
const { ErrorReponse } = require("../utils/response-structure");
const {verifyToken}=require('../utils/auth');


function isAuthenticated(req,res,next){
    const token=req.cookies['x-access-token'];
    let decodejwttoken;
    console.log(token);
    if(!token){
        ErrorReponse.message='Missing JWT token';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    try {
        decodejwttoken=verifyToken(token);
        console.log(decodejwttoken);
    } catch (error) {
        ErrorReponse.error=error;
        ErrorReponse.message='Invalid JWT token';

        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    
    req.user=decodejwttoken;
    next();
}



module.exports={
    isAuthenticated
}