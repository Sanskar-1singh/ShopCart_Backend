const jwt=require('jsonwebtoken');
const {ServerConfig}=require('../config');
const { JWT_SECRET } = require('../config/ServerConfig');

function generateToken(payload){
    return jwt.sign(payload,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
}

function verifyToken(token){
    return jwt.verify(token,JWT_SECRET);
}

module.exports={
    generateToken
}