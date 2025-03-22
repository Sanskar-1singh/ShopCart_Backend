'use strict';
const {
  Model
} = require('sequelize');
const cart_products = require('./cart_products');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.category,{
        foreignKey:'category_id',
         as:'category_of_products'
      });
      this.belongsToMany(models.Cart, { through: models.cart_products, foreignKey: 'productsId' });
    }
  }
  Product.init({
    title: {
     type: DataTypes.STRING,
     allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false
     },
    price:  {
      type: DataTypes.STRING,
      allowNull:false
     },
    image:  {
      type: DataTypes.STRING,
      allowNull:false
     },
    category_id:  {
      type: DataTypes.INTEGER,
      allowNull:false
     },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};