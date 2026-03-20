'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_carritos extends Model {
    static associate(models) {
      tbc_carritos.belongsTo(models.tbc_usuario, {
        as: 'usuario',
        foreignKey: 'id_usuario'
      });
      tbc_carritos.hasMany(models.tbc_carrito_detalle, {
        as: 'detalles',
        foreignKey: 'id_carrito'
      });
    }
  }

  tbc_carritos.init(
    {
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'tbc_carritos',
      tableName: 'tbc_carritos'
    }
  );

  return tbc_carritos;
};
