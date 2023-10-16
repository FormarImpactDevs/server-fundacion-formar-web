const { default: axios } = require("axios");
const { NotificationsMP, Order } = require("../database/models");

const getNotificationsMP = async () => {
  try {
    const notifications = await NotificationsMP.findAll();

    return notifications;
  } catch (error) {
    console.error("Error al obtener Notificaciones de Mercado Pago: ", error);
    throw new Error("Error al obtener Notificaciones de Mercado Pago");
  }
};
const getNotificationsMPById = async (notificationId) => {
  try {
    const notifications = await NotificationsMP.findByPk(notificationId, {
      include: [{ association: "orders" }],
    });

    return notifications;
  } catch (error) {
    console.error("Error al obtener Notificaciones de Mercado Pago: ", error);
    throw new Error("Error al obtener Notificaciones de Mercado Pago");
  }
};

const insertNotification = async (notificationData) => {
  try {
    return await NotificationsMP.create(notificationData);
  } catch (error) {
    console.error("Error al insertar Notificaciones de Mercado Pago: ", error);
    throw new Error("Error al insertar Notificaciones de Mercado Pago");
  }
};

const updateOrderRequest = async (orderId, data) => {
  const ENDPOINT = `/api/orders/update/${orderId}`;
  try {
    return await axios.put(ENDPOINT, data);
  } catch (error) {
    console.error("Error al actualizar estado de pedido: ", error);
    throw new Error("Error al actualizar estado de pedido");
  }
};

module.exports = {
  getNotificationsMP,
  getNotificationsMPById,
  insertNotification,
  updateOrderRequest,
};
