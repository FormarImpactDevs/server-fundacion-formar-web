'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      forma_retiro: {
        type: Sequelize.STRING
      },
      estado_del_pedido: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      client_data: {
        type: Sequelize.TEXT
      },
      punto_retiro_id: {
        type: Sequelize.INTEGER
      },
      numero_orden: {
        type: Sequelize.STRING
      },
      tipo_de_entrega: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Orders');
  }
};