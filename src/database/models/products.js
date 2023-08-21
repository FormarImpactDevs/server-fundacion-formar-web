'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Category,{
        as:'category',
        foreignKey: "categoria_id"
      }),
      Products.belongsTo(models.Images_products,{
        as:'imagenes',
        foreignKey: "producto_id",
        onDelete:'cascade'
      }),
      Products.belongsTo(models.Emprendimientos,{
        as:'emprendimientos',
        foreignKey: "emprendimientos_id"
      })
    }
  }
  Products.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    descuento: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    emprendimientos_id: DataTypes.INTEGER,
    categoria_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return Products;
};