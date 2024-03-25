const { Product } = require("../database/models");
const { deleteImagesProduct } = require("./productImages.service");

const getProduct = async () => {
    try {
      const products = await Product.findAll({
        include: [
          { association: "category" },
          { association: "images" },
          { association: "emprendimientos" }
          ,]
    
      });

      return products;
  } catch (error) {
    console.error("Error while fetching products: ", error);
    throw new Error("Error while fetching products");
  }
};

const getProductById = async (productId) => {
    try {
      const product = await Product.findByPk(productId, {
        include: [
            { association: "category" },
            { association: "images" },
            { association: "emprendimientos" },
        ],
      });
  
      return product
    } catch (error) {
      console.error("Error while fetching product: ", error);
      throw new Error("Error while fetching product");
    }
  };

 const insertProduct = async (productData) => {
    try {
      return await Product.create(productData);
    } catch (error) {
      console.error("Error al insertar un producto:", error);
      throw new Error("Error al insertar un producto");
    }
  };

  const updateProduct = async (productData) => {
    try {
      return await Product.update(productData, { where: { id: productData.id } });
    } catch (error) {
      console.error("Error al actualizar un producto:", error);
      throw new Error("Error al actualizar un producto");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteImagesProduct(productId);
      return await Product.destroy({ where: { id: productId } });
    } catch (error) {
      console.error("Error al tratar de eliminar un Producto:", error);
      throw new Error("Error al tratar de eliminar un Producto");
    }
  };

  module.exports = {
    getProduct,
    getProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}