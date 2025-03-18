const express=require('express');
const app=express();
const {ServerConfig}=require('./config');
const apiroutes=require('./routes/apiRouter');



app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use('/api',apiroutes);


app.listen(ServerConfig.PORT,()=>{
    console.log(`server started at port ${ServerConfig.PORT}`);
})