const express=require('express');

const {getUsers,getUser,createUser,destroyUser}=require('../../controllers/user-controller');

const userrouter=express.Router();

userrouter.get('/',getUsers);
userrouter.get('/:id',getUser);
userrouter.delete('/:id',destroyUser);
userrouter.post('/',createUser);

module.exports=userrouter;