const NOTIFICATIONS_CONSTANTS = {
  type: {
    PAYMENT: "payment",
  },
  action: {
    PAYMENT_CREATED: "payment.created",
    PAYMENT_UPDATED: "payment.updated",
  },
};

const ORDER_CONSTANTS = {
    POINT: "point",
    DELIVERY: "delivery",
};

module.exports = { NOTIFICATIONS_CONSTANTS, ORDER_CONSTANTS };
