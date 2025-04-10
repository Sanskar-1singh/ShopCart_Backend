'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig}=require('../config');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasOne(models.Cart,{
        foreignKey:'UserId',
        onDelete:'CASCADE'
      });

      this.hasMany(models.Order,{
        foreignKey:'userId'
      })
    }
  }
  Users.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,30],
        isAlphanumeric:true
      }
    },
  }, {
    sequelize,
    modelName: 'Users',
  });


  Users.beforeCreate(function encrypt(user){
    const encryptedPassword=bcrypt.hashSync(user.password,+ServerConfig.SALT_ROUND);
    user.password=encryptedPassword;
  })
  return Users;
};