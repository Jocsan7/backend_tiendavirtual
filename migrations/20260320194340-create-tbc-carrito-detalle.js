'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_carrito_detalles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      precio_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_carrito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbc_carritos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbc_productos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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

  async down(queryInterface) {
    await queryInterface.dropTable('tbc_carrito_detalles');
  }
};
