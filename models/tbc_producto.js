'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_producto extends Model {
    static associate(models) {
      tbc_producto.belongsTo(models.tbc_categorias, {
        as: 'categoria',
        foreignKey: 'id_categoria'
      });
      tbc_producto.hasMany(models.tbc_carrito_detalle, {
        as: 'detalles_carrito',
        foreignKey: 'id_producto'
      });
    }
  }

  tbc_producto.init(
    {
      descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'tbc_producto',
      tableName: 'tbc_productos'
    }
  );

  return tbc_producto;
};
