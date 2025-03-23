'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Orders',
          key:'id' 
        },
        onDelete:'CASCADE'
      },
      ProductId: {
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
    await queryInterface.dropTable('Order_products');
  }
};