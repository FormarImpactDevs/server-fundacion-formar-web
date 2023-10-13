const { imagesProducts } = require("../database/models");


const insertImagesProduct = async (images) => {
    try {
      return await imagesProducts.bulkCreate(images);
    } catch (error) {
      console.error("Error al insertar una imagen de producto:", error);
      throw new Error("Error al insertar una imagen de producto");
    }
  };



module.exports = {insertImagesProduct}