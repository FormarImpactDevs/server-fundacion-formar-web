

const sendResponse = require("../../utils/sendResponse");

module.exports = {
  sendContactMessage: async (req, res) => {
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
};
