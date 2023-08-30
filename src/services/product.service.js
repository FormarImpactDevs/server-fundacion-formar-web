const { Product } = require("../database/models");

const getProducts = async () => {
    try {
      const products = await Product.findAll({
        include: [
          { association: "category" },
          { association: "images" },
          { association: "emprendimientos" },]
    
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

  const createProduct = async (productData) => {
    try{
      return await Product.create(productData);
    }catch (error){
      console.error("Error while create Product:", error);
      throw new Error("Error create Product");
    }
  };

  const updateProduct = async (productData) => {
    try{
      return await Product.update(productData, {where: {id: productData.id}});
    } catch (error) {
      console.error("Error while update Product:", error);
      throw new Error("Error update Product");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      return await Product.destroy({ where: { id: productId}});
    } catch (error) {
      console.error("Error while delete product:", error);
      throw new Error("Error delete product");
    }
  };

  module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}