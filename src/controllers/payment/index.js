const { validationResult } = require("express-validator");
const paymentService = require("../../services/payment.service");

// Obtener todos los pagos
const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    return res.status(200).json(payments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Obtener un pago por orderId
const getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const payment = await paymentService.getPaymentByOrderId(orderId);
    return res.status(200).json(payment);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Agregar un pago
const addPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const paymentData = req.body;
  try {
    const payment = await paymentService.addPayment(paymentData);
    return res.status(201).json(payment);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Modificar un pago por ID
const updatePayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const { id } = req.params;
  const paymentData = req.body;
  try {
    await paymentService.updatePayment(id, paymentData);
    return res.status(200).json({ message: "Pago actualizado exitosamente" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar un pago por ID
const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await paymentService.deletePayment(id);
    return res.status(200).json({ message: "Pago eliminado exitosamente" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentByOrderId,
  addPayment,
  updatePayment,
  deletePayment,
};
