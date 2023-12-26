module.exports = (sequelize, dataTypes) => {
  const alias = "PuntoDeRetiro";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: dataTypes.STRING,
    descripcion: dataTypes.TEXT,
    telefono: dataTypes.INTEGER,
  };

  const config = {
    tableName: "punto_de_retiro",
    timestamps: false,
    /*   createdAt: "created_at",
    updatedAt: "updated_at", */
  };

  const PUNTO_DE_RETIRO = sequelize.define(alias, cols, config);

  PUNTO_DE_RETIRO.associate = (models) => {
    PUNTO_DE_RETIRO.hasMany(models.Order, {
      as: "orders",
      foreignKey: "punto_retiro_id",
    });
  };

  return PUNTO_DE_RETIRO;
};
