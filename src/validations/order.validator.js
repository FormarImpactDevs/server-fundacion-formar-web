const { body } = require('express-validator');

const validateCreateOrder = [
  body('tipo_de_entrega').isIn(['point', 'delivery']).withMessage('El tipo de entrega debe ser "point" o "delivery"'),
  body('client_data').notEmpty().withMessage('Los datos del cliente son obligatorios'),
  
  body('punto_retiro_id').custom((value)=> {
    if (value === null || value === undefined) {
      return true; // Si el valor es null o undefined, se permite
    }
    if (typeof value !== 'number') {
      throw new Error('El ID del punto de retiro debe ser un número');
    }
  }).withMessage('El ID del punto de retiro debe ser un número'),
];

const validateUpdateOrder = [
    body('estado_del_pedido').notEmpty().withMessage('El estado del pedido es obligatorio'),
];

module.exports = { validateCreateOrder, validateUpdateOrder };
