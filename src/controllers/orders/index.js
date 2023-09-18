const { validationResult } = require('express-validator');
const { Order } = require('../../database/models');
const { createOrder, updateOrder, deleteOrder } = require('../../services/order.service');

// Listar todas las órdenes
async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll();
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
}

// Obtener una orden por su ID
async function getOrderById(req, res) {
  const { orderNumber } = req.params;
  try {
    const order = await Order.findOne({where: { numero_order: orderNumber}});
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la orden' });
  }
}

// Crear una nueva orden
async function createNewOrder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = await createOrder(req.body);

    return res.status(201).json(order);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al crear la orden' });
  }
}

// Actualizar una orden por su ID
async function updateOrderById(req, res) {
  const { orderNumber } = req.params;

  try {
    const order = await updateOrder(orderNumber, req.body);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la orden' });
  }
}

// Eliminar una orden por su ID
async function deleteOrderById(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteOrder(id);

    if (result === null) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    return res.json({ message: 'Orden eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la orden' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrderById,
  deleteOrderById,
};
