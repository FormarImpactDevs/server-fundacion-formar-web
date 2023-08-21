'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ordenes.hasMany(models.Punto_de_retiro,{
        as: 'Punto_de_retiro',
        foreignKey: 'punto_retiro_id'
      })
    }
  }
  orders.init({
    forma_retiro: DataTypes.STRING,
    estado_del_pedido: DataTypes.STRING,
    link: DataTypes.STRING,
    client_data: DataTypes.TEXT,
    punto_retiro_id: DataTypes.INTEGER,
    numero_orden: DataTypes.STRING,
    tipo_de_entrega: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};