const express = require("express");
const router = express.Router();
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct} = require("../controllers/products");
let uploadProductFile = require("../middlewares/uploadProductFile");
const {productValidationRules} = require("../validations/product.validator");
const validate = require("../validations/index.validator");
//const verifyToken = require("../middlewares/jwt.middleware");

router
    .get("/", getProduct)
    .get("/:id", getProductById)
    .post("/create", uploadProductFile.array('images', 3), productValidationRules(), validate, createProduct)
    .put("/update/:id", uploadProductFile.array('images', 3),  productValidationRules(), validate, updateProduct)
    .delete("/delete/:id", deleteProduct);
module.exports = router;
