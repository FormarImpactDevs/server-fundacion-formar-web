const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categories");

router
    .get("/", getCategories)
    .get("/:id", getCategoryById)
    .post("/create", createCategory)
    .put("/:id", updateCategory)
    .delete("/:id", deleteCategory)
module.exports = router;