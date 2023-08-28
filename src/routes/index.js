/* const db = require("../database/models") */
const enterpriseRouter = require("./enterprise");
const usersRouter = require("./user");
const categoryRouter = require("./category");
const orderRouter = require("./order")



module.exports = [enterpriseRouter,usersRouter, categoryRouter, orderRouter];