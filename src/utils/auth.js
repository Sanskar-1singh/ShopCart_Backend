const jwt=require('jsonwebtoken');
const {ServerConfig}=require('../config');

function generateToken(payload){
    return jwt.sign(payload,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
}

module.exports={
    generateToken
}