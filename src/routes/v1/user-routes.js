const express=require('express');

const {getUsers,getUser,createUser,destroyUser,signup, signin}=require('../../controllers/user-controller');

const userrouter=express.Router();

userrouter.get('/',getUsers);
userrouter.get('/:id',getUser);
userrouter.delete('/:id',destroyUser);
userrouter.post('/signup',signup);
userrouter.post('/signin',signin)

module.exports=userrouter;