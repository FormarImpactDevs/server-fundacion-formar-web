  const { ImagesProducts } = require("../database/models");


const insertImagesProduct = async (images) => {
    try {
      const productImagesResult = await ImagesProducts.bulkCreate(images);
      return productImagesResult;
    } catch (error) {
      console.error("Error al insertar una imagen de producto:", error);
      throw new Error("Error al insertar una imagen de producto");
    }
  };

const updateImagesProduct = async (id) => {
 try {
    const productImagesResult = await ImagesProducts.update({where: {productos_id: id}});
    return productImagesResult;
  } catch (error) {
    console.error("Error al eliminar una imagen de producto:", error);
    throw new Error("Error al eliminar una imagen de producto");
  }
  
}

const DeleteImagesProduct = async (id) => {
 try {
    const productImagesResult = await ImagesProducts.destroy({where: {productos_id: id}});
    return productImagesResult;
  } catch (error) {
    console.error("Error al eliminar una imagen de producto:", error);
    throw new Error("Error al eliminar una imagen de producto");
  }
  
}


module.exports = {insertImagesProduct, DeleteImagesProduct}