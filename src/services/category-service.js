const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");
const { where } = require("sequelize");

class CategoryService{
    constructor(respository){
        this.respository=respository;
    }

    async createCategory(category){
        try {
            const response=await this.respository.createCategory({...category});
            return response;
        } catch (error) {
            console.log("error from service",error);
                if(error.name=='SequelizeUniqueConstraintError'){
                    let explanation=[];
                    console.log(error);
                     error.errors.forEach((err)=>{
                        explanation.push(err.message);
                        explanation.push(err.value);
                     });
                     console.log("the explanation",explanation);
                     throw new AppError(explanation,StatusCodes.BAD_REQUEST);
                }
                if(error.name=='SequelizeValidationError'){
                    let explanation=[];
                    console.log(error);
                     error.errors.forEach((err)=>{
                        explanation.push(err.message);
                        explanation.push(err.value);
                     });
                     console.log("the explanation",explanation);
                     throw new AppError(explanation,StatusCodes.BAD_REQUEST);
                }
                throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
             }
            
        }
      

    async getCategories(){
        try {
            const response=await this.respository.getCategories();
            return response;
        } catch (error) {
            throw error;
        }
       
    }

    async getCategory(id){
        try {
            const response=await this.respository.getCategory(id);
            console.log(response);
            return response;
        } catch (error) {
            throw error;
        }
       
    }
   
    async destroy(id){
        try { 
            const response=await this.respository.destroy(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
   
}

module.exports=CategoryService;