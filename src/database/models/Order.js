module.exports = (sequelize, dataTypes) => {
  const alias = "Order";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    forma_retiro: dataTypes.STRING,
    estado_del_pedido: dataTypes.STRING,
    link: dataTypes.STRING,
    client_data: dataTypes.TEXT,
    punto_retiro_id: dataTypes.INTEGER,
    numero_orden: dataTypes.STRING,
    tipo_de_entrega: dataTypes.STRING,
  };

  const config = {
    tableName: "pedidos",
    timestamps: false
   /*  createdAt: "created_at",
    updatedAt: "updated_at", */
  };

  const ORDER = sequelize.define(alias, cols, config);

  ORDER.associate = (models) => {
    ORDER.hasMany(models.PuntoDeRetiro, {
      as: "Punto_de_retiro",
      foreignKey: "punto_retiro_id",
    });
  };

  return ORDER;
};
