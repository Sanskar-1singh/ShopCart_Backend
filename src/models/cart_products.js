'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart_products.init({
    cartId:{ 
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    productsId:{ 
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    quantity:{ 
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
  }, {
    sequelize,
    modelName: 'cart_products',
  });
  return cart_products;
};