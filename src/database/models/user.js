module.exports = (sequelize, dataTypes) => {
  const alias = "User";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(70),
      allowNull: false,
    },
  };

  const config = {
    tableName: "usuarios",
    timestamps: false,
    /* createdAt: "created_at",
      updatedAt: "updated_at", */
  };

  const USER = sequelize.define(alias, cols, config);

  return USER;
};
