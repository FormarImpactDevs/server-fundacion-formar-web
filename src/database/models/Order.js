module.exports = (sequelize, dataTypes) => {
  const alias = "Order";

  const cols = {
    numero_orden: {
      type: dataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    tipo_de_entrega: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    estado_del_pedido: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    estado_del_pago: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    client_data: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    punto_retiro_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    
    detalle_pedido: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    monto_total: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  const config = {
    tableName: "pedidos",
    timestamps: false
   /*  createdAt: "created_at",
    updatedAt: "updated_at", */
  };

  const ORDER = sequelize.define(alias, cols, config);

  ORDER.associate = (models) => {

    ORDER.belongsTo(models.PuntoDeRetiro, {
      as: "punto_de_retiro",
      foreignKey: "punto_retiro_id",
    });

    ORDER.hasOne(models.Payment, {
      as: "payments",
      foreignKey: "orderId",
    });
  };

  return ORDER;
};
