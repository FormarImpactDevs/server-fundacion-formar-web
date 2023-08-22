/* 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate(models) {
      Category.hasMany(models.Products,{
        as:'products',
        foreignKey: "categoria_id"
      })
    }
  }
  Category.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
 */

module.exports = (sequelize, dataTypes) => {
  const alias = "Category";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: dataTypes.STRING,
    }
  };

  const config = {
    tableName: "categoria",
    timestamps: false
  };

  const CATEGORY = sequelize.define(alias, cols, config);

  CATEGORY.associate = (models) => {
    CATEGORY.hasMany(models.Product, {
      as:'products',
      foreignKey: "categoria_id"
    });
  };

  return CATEGORY;
};