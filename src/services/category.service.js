const { Category, Product } = require("../database/models");

const getCategories = async () => {
  console.log(Category);
  try {
    const category = await Category.findAll({
      include: [{ association: "products" }],
    });

    return category;
  } catch (error) {
    console.error("Error while fetching category: ", error);
    throw new Error("Error while fetching category");
  }
};

const getCategoryById = async (id) => {
  try {
    return await Category.findByPk(id, {
      include: [{ association: "products" }],
    });
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
    const category = await Category.findByPk(categoryId, {
      include: [
        {
          association: "products",
        },
      ],
    });

    // Actualizar todos los productos asociados para que su categoría sea 1
    await Promise.all(
      category.products.map(async (product) => {
        // Seteamos en 1 pensando en que esta sea por defecto "Sin categoria"
        await Product.update(
          { categoria_id: 1 },
          { where: { id: product.id } }
        );
      })
    );
    // Eliminar la categoría después de actualizar los productos
    await Category.destroy({ where: { id: categoryId } });
    return "Ok";
  } catch (error) {
    console.error("Error al intentar eliminar una Categoría:", error);
    return "Ocurrió un error al intentar eliminar la caategoría y modificar sus productos asociados.";
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
