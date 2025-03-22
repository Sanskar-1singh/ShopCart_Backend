'use strict';
const {
  Model
} = require('sequelize');
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
    }
  }
  Cart.init({
    UserId: {
     type:DataTypes.NUMBER,
     allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};