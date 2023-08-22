module.exports = (sequelize, dataTypes) => {
  const alias = "ImagesProducts";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    imagen: dataTypes.STRING,
    productos_id: dataTypes.INTEGER,
  };

  const config = {
    tableName: "imagenes_productos",
    timestamps: false,
  };

  const PRODUCT_IMAGE = sequelize.define(alias, cols, config);

  PRODUCT_IMAGE.associate = (models) => {
    PRODUCT_IMAGE.belongsTo(models.Product, {
      as: "product",
      foreignKey: "productos_id",
    });
  };

  return PRODUCT_IMAGE;
};
