const { generateOrderNumber } = require('../helpers/orders.helper');
const { Order } = require('../database/models');
const { createMpPayment } = require('./mp.services');

// Crear una nueva orden
async function createOrder(orderData) {
  const {
    tipo_de_entrega,
    estado_del_pedido = "pending",
    client_data,
    punto_retiro_id,
    detalle_pedido,
  } = orderData;

  const numero_orden = generateOrderNumber(tipo_de_entrega); // Generar un número de orden único

  const { email } = client_data;

  try {
    // Parsear el detalle del pedido como un array de productos
    const products = detalle_pedido;

    // Calcular la suma total de los productos
    let totalAmount = 0;
    products.forEach((product) => {
      totalAmount += product.unit_price * product.quantity;
    });

    // Crear el pago en Mercado Pago
    const paymentData = await createMpPayment({
      payer_email: email,
      items: products,
      orderId: numero_orden,
      isChange: false,
    });

    const link = paymentData.init_point;

    const order = await Order.create({
      tipo_de_entrega,
      estado_del_pedido,
      link,
      client_data: JSON.stringify(client_data),
      punto_retiro_id,
      numero_orden,
      detalle_pedido: JSON.stringify(products), // Guardar el detalle_pedido como JSON
      monto_total: totalAmount, // Guardar la suma total
    });

    return order;
  } catch (error) {
    console.error(error)

    throw new Error('Error al crear la orden');
  }
}

// Actualizar una orden por su ID
async function updateOrder(orderNumber, updatedData) {
  const order = await Order.findOne({where: { numero_orden: orderNumber }});

  if (!order) {
    return null;
  }


  await Order.update({
    ...updatedData,
  }, {
    where: {
        id: order.id,
    }
  });

  return order;
}

// Eliminar una orden por su ID
async function deleteOrder(orderId) {
  const order = await Order.findByPk(orderId);

  if (!order) {
    return null;
  }

  await Order.destroy({
    where:{
        id : orderId
        },
  });
  return true;
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
};
