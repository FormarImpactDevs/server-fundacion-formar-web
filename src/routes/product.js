const express = require("express");
const router = express.Router();
const {
 getProducts, 
 getProductById,
 createProduct,
 updateProduct,
 deleteProduct } = require("../controllers/products");
//const verifyToken = require("../middlewares/jwt.middleware");

router
    .get("/", getProducts)
    .get("/:id", getProductById)
    .post("/create", createProduct)
    .put("/:id", updateProduct)
    .delete("/:id", deleteProduct);


module.exports = router;
