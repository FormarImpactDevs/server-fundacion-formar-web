const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/users/index");
const { userRegisterValidationRules } = require("../validations/register.validator");
const validate = require("../validations/index.validator");
const userLoginValidationRules = require("../validations/login.validator");

router
  .get("/", getUsers)
  .get("/:id", getUserById)
  .post("/login", userLoginValidationRules(), validate, login)
  .post("/register", userRegisterValidationRules(), validate, createUser)
/*   .post("/login", login) */
/*   .post("/create", createUser) */
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;