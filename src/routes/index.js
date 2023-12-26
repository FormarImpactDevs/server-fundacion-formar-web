const enterpriseRouter = require("./enterprise");
const usersRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");
const orderRouter = require("./order");
const notificationRouter = require("./notification");
const paymentRouter = require("./payment");
const pointRouter = require("./point");

module.exports = {
  enterpriseRouter,
  usersRouter,
  categoryRouter,
  productRouter,
  orderRouter,
  notificationRouter,
  paymentRouter,
  pointRouter
};
