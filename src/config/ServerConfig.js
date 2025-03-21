const dotenv=require('dotenv');

dotenv.config();

module.exports={
    PORT:process.env.PORT  || 8080,
    SALT_ROUND:process.env.SALT_ROUND
}