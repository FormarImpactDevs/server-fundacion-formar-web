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