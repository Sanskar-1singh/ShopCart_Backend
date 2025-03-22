'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Carts',
          key:'id'
        },
        onDelete:'CASCADE'

      },
      productsId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Products',
          key:'id'
        },
        onDelete:'CASCADE'

      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_products');
  }
};