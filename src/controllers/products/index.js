const {
  getProduct,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../../services/product.service");
const {
  insertImagesProduct,
  updateImagesProduct,
  deleteImagesProduct,
} = require("../../services/productImages.service");
const process = require("process");
const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const deletedFiles = require("../../utils/deletedFiles");

const { validationResult } = require("express-validator");

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
    try {
      const product = await getProductById(PRODUCT_ID);
      return res.status(200).json(product);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al tratar de obtener el producto: ${error}` });
    }
  },

  createProduct: async (req, res) => {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      descuento,
      emprendimientos_id,
    } = req.body;
    const errors = validationResult(req);
    let photos = [];

    if (req.files) {
      req.files.forEach((image) => {
        photos.push(image.filename);
      });
    }

    if (errors.isEmpty()) {
      try {
        const productResult = await insertProduct({
          nombre,
          descripcion,
          precio,
          descuento,
          stock,
          categoria_id,
          emprendimientos_id,
        });

        if (productResult) {
          if (photos.length > 0) {
            const images = req.files.map((file) => {
              return {
                imagen: `${SERVER_BASE_URL}/images/imagesProduct/${file.filename}`,
                productos_id: productResult.id,
              };
            });

            try {
              const productImagesResult = await insertImagesProduct(images);
              const SUCCESS_RESPONSE = "Producto creado satisfactoriamente";
              return res
                .status(201)
                .json({ msg: SUCCESS_RESPONSE, productImagesResult });
            } catch (error) {
              console.error(
                "Error al insertar imágenes en la base de datos:",
                error
              );
              const ERROR_RESPONSE =
                "Ocurrió un error al insertar imágenes en la base de datos";
              return res.status(500).json({ msg: ERROR_RESPONSE, error });
            }
          }
        } else {
          if (photos.length > 0) {
            await deletedFiles("imagesProduct", photos);
          }
          const ERROR_RESPONSE = "Ocurrió un error";
          return res.status(400).json({ msg: ERROR_RESPONSE });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ Error: `Ocurrió un error al crear el producto: ${error}` });
      }
    } else {
      return res.status(500).json({ errors: errors.array() });
    }
  },

  updateProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const Product = await getProductById(PRODUCT_ID);

    const {
      nombre,
      descripcion,
      precio,
      stock,
      descuento,
      emprendimientos_id,
      categoria_id,
    } = req.body;
    const errors = validationResult(req);

    let filesOld = [];

    let filesNew = [];

    if (errors.isEmpty()) {
      try {
        if (req.files) {
          const images = req.files.map((file) => {
            return {
              imagen: `${SERVER_BASE_URL}/images/imagesProduct/${file.filename}`,
              productos_id: Product.id,
            };
          });
          filesNew.push(images);
        }

        if (Product.images.length > 0) {
          Product.images.forEach((image) => {
            filesOld.push(image.imagen);
          });
          await deleteImagesProduct(PRODUCT_ID);
        }
        const result = await updateProduct({
          id: PRODUCT_ID,
          nombre: nombre || Product.nombre,
          descripcion: descripcion || Product.descripcion,
          precio,
          stock,
          emprendimientos_id,
          descuento,
          categoria_id,
        });

        if (result) {
          try {
            const productImagesResult = await updateImagesProduct(filesNew);
            const SUCCESS_RESPONSE =
              "Producto actualizado satisfactoriamente";
            return res
              .status(201)
              .json({ msg: SUCCESS_RESPONSE, productImagesResult });
          } catch (error) {
            console.error(
              "Error al insertar imágenes en la base de datos:",
              error
            );
            const ERROR_RESPONSE =
              "Ocurrió un error al insertar imágenes en la base de datos";
            return res.status(500).json({ msg: ERROR_RESPONSE, error });
          }
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
        return res
          .status(500)
          .json({ Error: `Ocurrió un error al actualizar el Producto: ${error}` });
      }
    } else {
      return res.status(500).json({ errors: errors.array() });
    }
  },

  deleteProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    try {
      const product = await getProductById(PRODUCT_ID);

      await deleteImagesProduct(PRODUCT_ID);

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
