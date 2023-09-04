const { Category } = require("../database/models");

const getCategories = async () => {
  console.log(Category);
try {
  const category = await Category.findAll();

  return category;
} catch (error) {
  console.error("Error while fetching category: ", error);
  throw new Error("Error while fetching category");
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

const createCategory = async (categoryData) => {
    try {
      return await Category.create(categoryData);
    } catch (error) {
      console.error("Error while insert category:", error);
      throw new Error("Error insert category");
    }
  };

  const updateCategory = async (categoryId, updatedData) => {
    try {
      return await Category.update(updatedData, { where: { id: categoryId } });
    } catch (error) {
      console.error("Error while updating category:", error);
      throw new Error("Error updating category");
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      return await Category.destroy({ where: { id: categoryId } });
    } catch (error) {
      console.error("Error while delete category:", error);
      throw new Error("Error delete category");
    }
  };

  module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };