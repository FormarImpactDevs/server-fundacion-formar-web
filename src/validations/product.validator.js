 const { body } = require("express-validator");

const productValidationRules = () => {
  return [
    body("nombre").notEmpty().withMessage("Nombre es requerido"),
    body("precio").notEmpty().withMessage("Precio es requerido").isInt().withMessage("precio invalido"),
    body("descuento").optional().isInt().withMessage("Descuento invalido"),
    body("descripcion").optional().isLength({ max: 800 }).withMessage("Descripcion excede el maximo permitido"),
    body("categoria_id").notEmpty().withMessage("Categoria ID es requerida").isInt().withMessage("Categoria ID invalida"),
    body("stock").notEmpty().withMessage("Stock es requerido").isInt().withMessage("Stock invalido"),
    body("emprendimientos_id").notEmpty().withMessage("Emprendimientos ID es requerido").isInt().withMessage("Emprendimientos ID invalido"),
  ];
};


module.exports = {
  productValidationRules,
};
