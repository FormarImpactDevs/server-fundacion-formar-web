'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Punto_de_retiro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Punto_de_retiro.belongsTo(models.Orders,{
        as:'orders',
        foreignKey: "pedidos_id"
      })
    }
  }
  Punto_de_retiro.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    telefono: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Punto_de_retiro',
  });
  return Punto_de_retiro;
};