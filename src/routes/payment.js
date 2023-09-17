const express = require("express");
const router = express.Router();
const {
  addPayment,
  deletePayment,
  getAllPayments,
  getPaymentByOrderId,
  updatePayment,
} = require("../controllers/payment");
const { validatePaymentFields } = require("../validations/payment.validator");

// Ruta para obtener todos los pagos
router.get("/", getAllPayments);

// Ruta para obtener un pago por orderId
router.get("/:orderId", getPaymentByOrderId);

// Ruta para agregar un pago
router.post("/", validatePaymentFields, addPayment);

// Ruta para modificar un pago por ID
router.put("/:id", validatePaymentFields, updatePayment);

// Ruta para eliminar un pago por ID
router.delete("/:id", deletePayment);

module.exports = router;
