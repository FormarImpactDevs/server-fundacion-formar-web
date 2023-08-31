module.exports = (sequelize, dataTypes) => {
  const alias = "Product";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: dataTypes.STRING,
    precio: dataTypes.INTEGER,
    descripcion: dataTypes.STRING,
    descuento: dataTypes.INTEGER,
    stock: dataTypes.INTEGER,
    emprendimientos_id: dataTypes.INTEGER,
    categoria_id: dataTypes.INTEGER,
  };

  const config = {
    tableName: "productos",
    timestamps: false,
    /*    createdAt: "created_at",
    updatedAt: "updated_at", */
  };

  const PRODUCT = sequelize.define(alias, cols, config);

  PRODUCT.associate = (models) => {
    PRODUCT.belongsTo(models.Category, {
      as: "category",
      foreignKey: "categoria_id",
    });

    PRODUCT.hasMany(models.ImagesProducts, {
      as: "images",
      foreignKey: "productos_id",
      onDelete: "cascade",
    });

    PRODUCT.belongsTo(models.Enterprise, {
      as: "emprendimientos",
      foreignKey: "emprendimientos_id",
    });
  };

  return PRODUCT;
};
