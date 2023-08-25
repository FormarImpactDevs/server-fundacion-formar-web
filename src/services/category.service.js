const { Category } = require("../database/models");

const getCategories = async () => {
  try {
    return await Category.findAll();
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw new Error("Error fetching categories");
  }
};

const getCategoryById = async (id) => {
  try {
    return await Category.findByPk(id);
  } catch (error) {
    console.error("Error while fetching category:", error);
    throw new Error("Error fetching category");
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};