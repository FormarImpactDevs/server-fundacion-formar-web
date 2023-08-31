const { body } = require("express-validator");

const productValidationRules = () => {
  return [
    body("nombre").notEmpty().withMessage("Nombre is required"),
    body("precio").notEmpty().withMessage("Precio is required").isInt().withMessage("Invalid precio"),
    body("descuento").optional().isInt().withMessage("Invalid discount"),
    body("descripcion").optional().isLength({ max: 800 }).withMessage("Description exceeds maximum length"),
    body("categoria_id").notEmpty().withMessage("Category ID is required").isInt().withMessage("Invalid category ID"),
    body("stock").notEmpty().withMessage("Stock is required").isInt().withMessage("Invalid stock"),
    body("emprendimientos_id").notEmpty().withMessage("Emprendimientos ID is required").isInt().withMessage("Invalid emprendimientos ID"),
  ];
};


module.exports = {
  productValidationRules,
};