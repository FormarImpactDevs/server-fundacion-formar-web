const db = require('../database/models');

// Obtener todos los pagos
const getAllPayments = async () => {
  try {
    return await db.Payment.findAll();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los pagos');
  }
};

// Obtener un pago por orderId
const getPaymentByOrderId = async (orderId) => {
  try {
    return await db.Payment.findOne({ where: { orderId } });
  } catch (error) {
    console.error(error);

    throw new Error('Error al obtener el pago');
  }
};

// Agregar un pago
const addPayment = async (paymentData) => {
  try {
    return await db.Payment.create(paymentData);
  } catch (error) {
    console.error(error);

    throw new Error('Error al agregar el pago');
  }
};

// Modificar un pago por ID
const updatePayment = async (id, paymentData) => {
  try {
    const [updatedCount] = await db.Payment.update(paymentData, { where: { id } });
    if (updatedCount === 0) {
      throw new Error('Pago no encontrado');
    }
  } catch (error) {
    console.error(error);

    throw new Error('Error al actualizar el pago');
  }
};

// Eliminar un pago por ID
const deletePayment = async (id) => {
  try {
    const deletedCount = await db.Payment.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error('Pago no encontrado');
    }
  } catch (error) {
    console.error(error);

    throw new Error('Error al eliminar el pago');
  }
};

module.exports = {
  getAllPayments,
  getPaymentByOrderId,
  addPayment,
  updatePayment,
  deletePayment,
};
