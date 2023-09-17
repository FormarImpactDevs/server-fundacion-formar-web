const axios = require("axios");
const process = require("process");

const createMpPayment = async ({
  payer_email,
  title,
  description,
  price,
  orderId,
  isChange,
}) => {
  const url = `${process.env.API_MP}/checkout/preferences`;
  const body = {
    payer_email,
    external_reference: orderId,
    items: [
      {
        title,
        description,
        category_id: "memberships",
        quantity: 1,
        unit_price: Number(price),
      },
    ],
    back_urls: {
      failure: isChange
        ? process.env.BASE_URL + "/membresias/modificar/estado/failure"
        : process.env.BASE_URL + "/usuario/suscripcion/failure",
      pending: isChange
        ? process.env.BASE_URL + "/membresias/modificar/estado/pending"
        : process.env.BASE_URL + "/usuario/suscripcion/pending",
      success: isChange
        ? process.env.BASE_URL + "/membresias/modificar/estado/success"
        : process.env.BASE_URL + "/usuario/suscripcion/success",
    },
  };
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return payment.data;
};

const getMpPaymentById = async (paymentId) => {
  const url = `${process.env.API_MP}/v1/payments/${paymentId}`;
  const payment = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  return payment.data;
};

module.exports = {
  getMpPaymentById,
  createMpPayment,
};
