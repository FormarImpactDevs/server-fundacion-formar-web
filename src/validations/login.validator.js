const { check, body } = require("express-validator");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../services/users.service");

const userLoginValidationRules = () => {
  return [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").notEmpty().withMessage("Password is required"),
    body("custom").custom(async (value, { req }) => {
      
      return getUserByEmail(req.body.email)
        .then((user) => {
          if (!bcrypt.compareSync(req.body.password, user.dataValues.password)) {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject("Email o contraseña incorrecto"));
    }),
  ];
};

module.exports = userLoginValidationRules;