const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategoryById
} = require("../controllers/categories");

router
    .get("/", getCategories)
    .get("/:id", getCategoryById);

module.exports = router;