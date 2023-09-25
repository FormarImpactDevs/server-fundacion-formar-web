const axios = require("axios");
const process = require("process");

/**
 * Crea un pago en Mercado Pago.
 * @param {Object} options - Opciones para crear el pago.
 * @param {string} options.payer_email - Email del pagador.
 * @param {string} options.title - Título del pago.
 * @param {string} options.description - Descripción del pago.
 * @param {number} options.price - Precio del pago.
 * @param {string} options.orderId - ID de la orden asociada al pago.
 * @param {boolean} options.isChange - Indica si es un cambio.
 * @returns {Promise<Object>} - Información del pago creado.
 * @throws {Error} - Si ocurre un error al crear el pago.
 */
const createMpPayment = async ({
  payer_email,
  items,
  orderId,
  isChange,
}) => {
  try {
    const url = `${process.env.API_MP}/checkout/preferences`;
    const body = {
      payer_email,
      external_reference: orderId,
      items,
      back_urls: {
        failure: isChange
          ? process.env.BASE_URL + "/feedback/failure"
          : process.env.BASE_URL + "/feedback/failure",
        pending: isChange
          ? process.env.BASE_URL + "/feedback/pending"
          : process.env.BASE_URL + "/feedback/pending",
        success: isChange
          ? process.env.BASE_URL + "/feedback/success"
          : process.env.BASE_URL + "/feedback/success",
      },
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return payment.data;
  } catch (error) {
    console.error(error)

    throw new Error('Error al crear el pago en Mercado Pago');
  }
};

/**
 * Obtiene información de un pago en Mercado Pago por su ID.
 * @param {string} paymentId - ID del pago.
 * @returns {Promise<Object>} - Información del pago.
 * @throws {Error} - Si ocurre un error al obtener la información del pago.
 */
const getMpPaymentById = async (paymentId) => {
  try {
    const url = `${process.env.API_MP}/v1/payments/${paymentId}`;
    const payment = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return payment.data;
  } catch (error) {
    throw new Error('Error al obtener la información del pago en Mercado Pago');
  }
};

module.exports = {
  getMpPaymentById,
  createMpPayment,
};
