'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_carrito_detalle extends Model {
    static associate(models) {
      tbc_carrito_detalle.belongsTo(models.tbc_carritos, {
        as: 'carrito',
        foreignKey: 'id_carrito'
      });
      tbc_carrito_detalle.belongsTo(models.tbc_producto, {
        as: 'producto',
        foreignKey: 'id_producto'
      });
    }
  }

  tbc_carrito_detalle.init(
    {
      precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'tbc_carrito_detalle',
      tableName: 'tbc_carrito_detalles'
    }
  );

  return tbc_carrito_detalle;
};
