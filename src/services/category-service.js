const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");

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
                throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
             }
            
        }
      

    async getCategories(){
        const response=await this.respository.getCategories();
        return response;
    }

    async getCategory(id){
        const response=await this.respository.getCategory(id);
        return response;
    }
}

module.exports=CategoryService;