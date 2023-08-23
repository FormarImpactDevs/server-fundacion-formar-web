/* const db = require("../database/models") */
const enterpriseRouter = require("./enterprise")
const usersRouter = require("./user")


module.exports = [enterpriseRouter,usersRouter];