'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificaciones_mp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notificaciones_mp.init({
    pedido_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notificaciones_mp',
  });
  return Notificaciones_mp;
};