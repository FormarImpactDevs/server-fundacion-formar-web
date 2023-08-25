/* const db = require("../database/models") */
const enterpriseRouter = require("./enterprise")
const usersRouter = require("./user")
const categoryRouter = require("./category")


module.exports = [enterpriseRouter,usersRouter,categoryRouter];