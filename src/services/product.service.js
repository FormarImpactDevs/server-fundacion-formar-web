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

  module.exports = {
    getProducts,
    getProductById
}