module.exports = (sequelize, dataTypes) => {
  const alias = "Payment";

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    paymentId: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    payer_email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    payerId: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    payer_details: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    payment_method_id: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    status_detail: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    transaction_amount: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  const config = {
    tableName: "pagos",
  };

  const PAYMENT = sequelize.define(alias, cols, config);

  PAYMENT.associate = (models) => {
    PAYMENT.belongsTo(models.Order, {
      as: "order",
      foreignKey: "orderId",
    });
  };

  return PAYMENT;
};
