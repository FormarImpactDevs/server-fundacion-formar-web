const express = require("express");
const router = express.Router();
const {
    getOrders,
    getOrderById,
    getOrderByUser,
    addToOrder,
    clearOrder,
    removeAllFromOrder,
    removeOneItemFromOrder
} = require("../controllers/orders.controller");
const verifyToken = require("../middlewares/index");

router
/*GET /pedidos - Lista de pedidos

POST /pedidos - Crear pedido

PUT /pedidos - Editar pedido */
    .get("/", verifyToken, getOrders)
    .get("/detail/:orderId", verifyToken, getOrderById)
    .get("/user", verifyToken, getOrderByUser)
    .post("/", verifyToken, addToOrder)
    .delete("/clear/:orderId", verifyToken, clearOrder)
    .delete("/:itemId", verifyToken, removeAllFromOrder)
    .put("/:itemId", verifyToken, removeOneItemFromOrder);

module.exports = router;