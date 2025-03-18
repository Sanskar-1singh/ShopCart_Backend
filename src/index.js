const express=require('express');
const app=express();
const {ServerConfig}=require('./config');
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.send('pong');
})

app.listen(ServerConfig.PORT,()=>{
    console.log(`server started at port ${ServerConfig.PORT}`);
})