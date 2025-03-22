const jwt=require('jsonwebtoken');
const {ServerConfig}=require('../config');
const { JWT_SECRET } = require('../config/ServerConfig');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');

function generateToken(payload){
    return jwt.sign(payload,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
}

function verifyToken(token){
    try {
       return jwt.verify(token,JWT_SECRET);
    } catch (error) {
       console.log(error);
       throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST); 
    }
}

module.exports={
    generateToken,
    verifyToken
}