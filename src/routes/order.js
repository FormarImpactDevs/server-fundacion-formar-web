const express = require("express");
const router = express.Router();
const {
  createNewOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderById,
} = require("../controllers/orders");
const {
  validateCreateOrder,
  validateUpdateOrder,
} = require("../validations/order.validator");

// Listar todas las órdenes
router.get("/", getAllOrders);

// Obtener una orden por su ID
router.get("/:id", getOrderById);

// Crear una nueva orden
router.post("/", validateCreateOrder, createNewOrder);

// Actualizar una orden por su ID
router.put("/:id", validateUpdateOrder, updateOrderById);

// Eliminar una orden por su ID
router.delete("/:id", deleteOrderById);

module.exports = router;
