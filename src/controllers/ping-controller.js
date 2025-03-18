function pingcheck(req,res){
    return res.status(200).json({
        message:'pong'
    });
}

module.exports={
    pingcheck,
}