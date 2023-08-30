const {
  getNotificationsMP,
  insertNotification,
  updateOrder,
} = require("../../services/notificationMP.service");

module.exports = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await getNotificationsMP();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ massage: error.massage });
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
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({
        Error: "Ocurrió un error al tratar de guardar la notificación " + error,
      });
    }
  },
};
