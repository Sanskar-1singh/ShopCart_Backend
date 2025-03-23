'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_products.init({
    orderId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    productId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
  }, {
    sequelize,
    modelName: 'Order_products',
  });
  return Order_products;
};