'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Imagenes.belongsTo(models.Products,{
        as: 'imagenes',
        foreignKey: 'productos_id'
      })
    }
  }
  Images_products.init({
    imagen: DataTypes.STRING,
    productos_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images_products',
  });
  return Images_products;
};