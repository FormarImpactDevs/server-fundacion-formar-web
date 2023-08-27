const { body } = require("express-validator");

const enterpriseValidationRules = () => {
  return [
    body("nombre").notEmpty().withMessage("El nombre es requerido").isLength({ max: 45 }).withMessage("El nombre del emprendimiento excede el largo maximo"),
    body("descripcion").notEmpty().withMessage("La descripcion es requerida"),
    body("foto_card").optional().isLength({ max: 45 }).withMessage("La foto de la card excede el largo maximo"),
    body("foto_emprendimiento").optional().isLength({ max: 45 }).withMessage("La foto del emprendimiento excede el largo maximo"),
  ];
};


module.exports = {
  enterpriseValidationRules,
};