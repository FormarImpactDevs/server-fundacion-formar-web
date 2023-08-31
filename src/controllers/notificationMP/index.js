const {
  getNotificationsMP,
  insertNotification,
  updateOrder,
} = require("../../services/notificationMP.service");

const sendResponse = require("../../utils/sendResponse");

module.exports = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await getNotificationsMP();
      return sendResponse(res, 200, "Lista de notificaciones", notifications);
    } catch (error) {
      return sendResponse(
        res,
        500,
        "Error al obtener la lista de notificaciones",
        error
      );
    }
  },

  insertNotification: async (req, res) => {
    try {
      const result = await insertNotification({
        ...req.body,
      });

      if (result) {
        const updatedDataOrder = await updateOrder({
          id: result.idPedido,
          estado_del_pedido: result.data,
        });

        const SUCCESS_RESPONSE = "Notificación guardada satisfactoriamente";

        return sendResponse(res, 201, SUCCESS_RESPONSE, result);
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return sendResponse(res, 400, ERROR_RESPONSE);
      }
    } catch (error) {
      return sendResponse(
        res,
        500,
        "Ocurrió un error al tratar de guardar la notificación ",
        error.message
      );
    }
  },
};
