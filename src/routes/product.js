const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/products");
//const verifyToken = require("../middlewares/jwt.middleware");

router
    .get("/", getProducts)
    .get("/:id", getProductById);


module.exports = router;
