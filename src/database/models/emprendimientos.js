module.exports = (sequelize, dataTypes) => {
  const alias = "Enterprise";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: dataTypes.STRING,
    },
    descripcion: {
      type: dataTypes.TEXT,
    },
    foto_card: {
      type: dataTypes.STRING,
    },
    foto_emprendimiento: {
      type: dataTypes.STRING,
    },
  };

  const config = {
    tableName: "emprendimientos",
    timestamps: false
  };

  const ENTERPRISE = sequelize.define(alias, cols, config);

  ENTERPRISE.associate = (models) => {
    ENTERPRISE.hasMany(models.Product, {
      as: "products",
      foreignKey: "emprendimientos_id",
    });
  };

  return ENTERPRISE;
};

