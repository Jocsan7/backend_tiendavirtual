'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_carritos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbc_usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('tbc_carritos');
  }
};
