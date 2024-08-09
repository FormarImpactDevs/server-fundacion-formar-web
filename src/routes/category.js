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
  .put("/update/:id", updateCategory)
  .delete("/delete/:id/:categoryProducts?", deleteCategory);
module.exports = router;
