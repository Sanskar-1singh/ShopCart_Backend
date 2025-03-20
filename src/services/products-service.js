const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");

class ProductService {
  constructor(repository) {
    this.repository = repository;
  }

  async createProduct(data) {
    try {
      console.log(data);
      const response = await this.repository.createProducts({ ...data });
      return response;
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        let explanation = [];
        console.log(error);
        error.errors.forEach((err) => {
          explanation.push(err.message);
          explanation.push(err.value);
        });
        console.log("the explanation", explanation);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      if (error.name == "SequelizeForeignKeyConstraintError") {
        console.log("Sequelize Database Error:", error.message);
        throw new AppError(
          `Database Error: ${error.message}`,
          StatusCodes.BAD_REQUEST
        );
      }
      throw new AppError(
        "something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getProducts() {
    try {
      const response = await this.repository.getProducts();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id) {
    try {
      const response = await this.repository.getProduct(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id){
    try {
        const response=await this.repository.destroyProduct(id);
        return response;
    } catch (error) {
        throw error;
    }
  }
}
module.exports = ProductService;
