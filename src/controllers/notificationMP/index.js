const { NOTIFICATIONS_CONSTANTS } = require("../../constants");
const { getMpPaymentById } = require("../../services/mp.services");
const {
  getNotificationsMP,
  insertNotification,
  updateOrderRequest,
} = require("../../services/notificationMP.service");
const { Payment } = require("../../database/models")

const sendResponse = require("../../utils/sendResponse");
const { updateOrderById } = require("../orders");

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
      const { 
        id, 
        type, 
        data, 
        action, 
        live_mode, 
        date_created, 
        application_id,
        user_id,
        version,
        api_version
      } =
        req.body;
      const result = await insertNotification({
        notificationId: id,
        type,
        data: JSON.stringify(data),
        action,
        live_mode,
        date_created,
        application_id,
        user_id,
        version,
        api_version,
        paymentId: data.id,
      });

      if (result) {
        if( type === NOTIFICATIONS_CONSTANTS.type.PAYMENT) {
          if (action === NOTIFICATIONS_CONSTANTS.action.PAYMENT_CREATED) {
            const paymentInfo = await getMpPaymentById(data.id);
            const orderId = paymentInfo.external_reference;
            const paymentData = {
              estado_del_pago: paymentInfo.status
            }
            
            await Payment.create({
              paymentId: paymentInfo.id,
              description: paymentInfo.description,
              payer_email: paymentInfo.payer.email,
              payerId: paymentInfo.payer.id,
              payer_details: JSON.stringify(paymentInfo.payer),
              payment_method_id: paymentInfo.payment_method_id,
              status: paymentInfo.status,
              status_detail: paymentInfo.status_detail,
              transaction_amount: paymentInfo.transaction_amount,
              orderId: paymentInfo.external_reference
            });
            
            try {
                await updateOrderRequest(orderId, paymentData)
                
              } catch (error) {
                console.error(error);
              }
           
          }
  
          if (action === NOTIFICATIONS_CONSTANTS.action.PAYMENT_UPDATED) {
            const paymentInfo = await getMpPaymentById(data.id);

            const orderId = paymentInfo.external_reference;
            const paymentData = {
              estado_del_pago: paymentInfo.status
            }

            await Payment.update({
              description: paymentInfo.description,
              payerId: paymentInfo.payer.id,
              payer_details: JSON.stringify(paymentInfo.payer),
              payment_method_id: paymentInfo.payment_method_id,
              status: paymentInfo.status,
              status_detail: paymentInfo.status_detail,
              transaction_amount: paymentInfo.transaction_amount,
            }, {
              where: {
                paymentId: paymentInfo.id
              }
            });
  
            try {
              await updateOrderRequest(orderId, paymentData)
              
            } catch (error) {
              console.error(error);
            }
          }
        }

        return sendResponse(res, 201);
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return sendResponse(res, 400, ERROR_RESPONSE);
      }
    } catch (error) {
      console.error(error)
      return sendResponse(
        res,
        500,
        "Ocurrió un error al tratar de guardar la notificación ",
        error.message
      );
    }
  },
};
