'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users,{
        foreignKey:'userId'
      });

      this.belongsToMany(models.Product,{
        through:models.Order_products
      });
    }
  }
  Order.init({
    status: {
      type:DataTypes.ENUM('PENDING','SUCCESSFULL','CANCELLED'),
      allowNull:false,
      defaultValue:'PENDING'
    },
    userId:{
      type: DataTypes.NUMBER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};