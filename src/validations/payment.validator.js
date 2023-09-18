const { body } = require('express-validator');

const validatePaymentFields = [
  body('paymentId').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('payer_email').notEmpty().isEmail(),
  body('payerId').notEmpty().isString(),
  body('payer_details').notEmpty().isString(),
  body('payment_method_id').notEmpty().isString(),
  body('status').notEmpty().isString(),
  body('status_detail').notEmpty().isString(),
  body('transaction_amount').notEmpty().isNumeric(),
  body('orderId').notEmpty().isNumeric(),
];

module.exports = {
  validatePaymentFields,
};