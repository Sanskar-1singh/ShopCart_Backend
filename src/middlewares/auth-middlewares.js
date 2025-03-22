const { StatusCodes } = require("http-status-codes");
const { ErrorReponse } = require("../utils/response-structure");
const {verifyToken}=require('../utils/auth');


function isAuthenticated(req,res,next){
    const token=req.cookies['x-access-token'];
    console.log(token);
    if(!token){
        ErrorReponse.message='Missing JWT token';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorReponse);
    }
    try {
       // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdjZXQxQGdtYWlsLmNvbSIsImlkIjoyNSwiaWF0IjoxNzQyNjE5MTYwLCJleHAiOjE3NDMwNTExNjB9.0dEopWPv9HpnhZEk6dxY5EworB7ANamkPxxteuzEjNw"
        const decodejwttoken=verifyToken(token);
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