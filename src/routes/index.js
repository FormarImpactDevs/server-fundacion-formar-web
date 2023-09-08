const enterpriseRouter = require("./enterprise");
const usersRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");
const orderRouter = require("./order");
const notificationRouter = require("./notification")

module.exports = {
  enterpriseRouter,
  usersRouter,
  categoryRouter,
  productRouter,
  orderRouter,
  notificationRouter
};
