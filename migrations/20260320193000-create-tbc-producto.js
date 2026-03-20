'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbc_categorias',
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
    await queryInterface.dropTable('tbc_productos');
  }
};
