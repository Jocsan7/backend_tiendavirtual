'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_categorias extends Model {
    static associate(models) {
      tbc_categorias.hasMany(models.tbc_producto, {
        as: 'productos',
        foreignKey: 'id_categoria'
      });
    }
  }

  tbc_categorias.init(
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'tbc_categorias',
      tableName: 'tbc_categorias'
    }
  );

  return tbc_categorias;
};
