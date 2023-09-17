const { 
  getProduct, 
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct} = require("../../services/product.service");

const deletedFiles = require("../../utils/deletedFiles");

const { productValidationRules } = require("express-validator");

module.exports = {
  getProduct: async (req, res) => {
    try {
      const product = await getProduct();
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getProductById: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const product = await getProductById(PRODUCT_ID);

    return res.status(200).json(product);
  },

  createProduct: async (req, res) => {
    let { nombre, descripcion, precio, stock, categoria_id, descuento, emprendimientos_id, foto_card } = req.body;
  
    let photos = [];
    if (req.files.foto_card) {
      photos.push(req.files.foto_card[0].filename);
    }

    let archivos = req.files;
    console.log(archivos);

    try {
    
    
      const result = await insertProduct({
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        descuento: descuento,
        stock: stock,
        foto_card: req.files.foto_card
         /* ? req.files.foto_card[0].filename
          : "default-image.png"*/,
        categoria_id: categoria_id,
        emprendimientos_id: emprendimientos_id,
      })
				

      if (result) {
        const SUCCESS_RESPONSE = "Producto creado satisfactoriamente";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        if (photos.length > 0) {
          await deletedFiles("imagesProduct", photos);
        }
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({
        Error:
          "Ocurrió un error al crear el producto " + error,
      });
    }
  },
  updateProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const Product = await getProductById(PRODUCT_ID);

    let { nombre, descripcion, precio, stock, descuento, emprendimientos_id, categoria_id } = req.body;

    let filesOld = [];

    let filesNew = [];

    try {
      if (req.files.foto_card) {
        filesOld.push(Product.foto_card);
        filesNew.push(req.files.foto_card[0].filename);
      }

      if (filesOld.length > 0) {
        await deletedFiles("imagesProduct", filesOld);
      }
      const result = await updateProduct({
        id: PRODUCT_ID,
        nombre: nombre ? nombre : Product.nombre,
        descripcion: descripcion ? descripcion : Product.descripcion,
        precio: precio,
        stock: stock,
        foto_card: req.files.foto_card
          ? req.files.foto_card[0].filename
          : Product.foto_card,
        emprendimientos_id: emprendimientos_id,
        descuento: descuento,
        categoria_id: categoria_id
      });

      if (result) {
        const SUCCESS_RESPONSE =
          "Producto actualizado satisfactoriamente";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        if (filesNew.length > 0) {
          await deletedFiles("imagesProduct", filesNew);
        }
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      if (filesNew.length > 0) {
        await deletedFiles("imagesProduct", filesNew);
      }
      return res.status(500).json({
        Error:
          "Ocurrió un error al actualizar el Producto " + error,
      });
    }
  },
  deleteProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    try {
      const product = await getProductById(PRODUCT_ID);
      let files = [product.foto_card];
      
      await deletedFiles("imagesProduct", files);
      // Elimino el producto de la base de datos
      const result = await deleteProduct(PRODUCT_ID);

      if (result) {
        const SUCCESS_RESPONSE = "Producto eliminado satisfactoriamente";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
};