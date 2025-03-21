'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product,{
        foreignKey:'category_id',
        onDelete:'CASCADE',
        as:'category_of_products'
      })
    }
  }
  category.init({
    name: {
     type: DataTypes.STRING,
     allowNull:false,
     unique:true
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false
     },
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};