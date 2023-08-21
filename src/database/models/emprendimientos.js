'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprendimientos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Emprendimientos.hasMany(models.Products,{
        as:'products',
        foreignKey: "producto_id"
      }),
      Emprendimientos.hasMany(models.User,{
        as:'user',
        foreignKey: "id_usuario"
      })
    }
    }
  }
  Emprendimientos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    foto_card: DataTypes.STRING,
    foto_emprendimiento: DataTypes.STRING,
    id_usuario:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Emprendimientos',
  });
  return Emprendimientos;
