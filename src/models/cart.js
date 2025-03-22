'use strict';
const {
  Model
} = require('sequelize');
const cart_products = require('./cart_products');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users,{//how to think belongTo and hasMany or hasOne>>>
        foreignKey:'UserId',
      });
      this.belongsToMany(models.Product, { through: models.cart_products, foreignKey: 'cartId' });

    }
  }
  Cart.init({
    UserId: {
     type:DataTypes.INTEGER,
     allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};