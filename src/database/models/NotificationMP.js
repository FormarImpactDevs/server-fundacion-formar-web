module.exports = (sequelize, dataTypes) => {
  const alias = "NotificationsMP";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    notificationId: dataTypes.STRING,
    type: dataTypes.STRING,
    data: dataTypes.STRING,
    action: dataTypes.STRING,
    live_mode: dataTypes.BOOLEAN,
    date_created: dataTypes.DATE,
    application_id: dataTypes.STRING,
    user_id: dataTypes.STRING,
    version: dataTypes.INTEGER,
    api_version: dataTypes.STRING,
    paymentId: dataTypes.STRING,
    idPedido: dataTypes.INTEGER,
  };

  const config = {
    tableName: "notificaciones_mp",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  };

  const NOTIFICACIONES_MP = sequelize.define(alias, cols, config);

  NOTIFICACIONES_MP.associate = (models) => {
    NOTIFICACIONES_MP.belongsTo(models.Order, {
      as: "orders",
      foreignKey: "idPedido",
    });
  };

  return NOTIFICACIONES_MP;
};
