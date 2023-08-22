module.exports = (sequelize, dataTypes) => {
  const alias = "NotificationsMP";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    pedido_id: dataTypes.INTEGER,
  };

  const config = {
    tableName: "notificacione_mp",
    timestamps: false,
    /*  createdAt: "created_at",
    updatedAt: "updated_at", */
  };

  const NOTIFICACIONES_MP = sequelize.define(alias, cols, config);

  NOTIFICACIONES_MP.associate = (models) => {
    // define association here
  };

  return NOTIFICACIONES_MP;
};
