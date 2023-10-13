const {
  getProduct,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../../services/product.service");
const { insertImagesProduct } = require("../../services/productImages.service");

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
    const product = await getProductById(PRODUCT_ID);

    return res.status(200).json(product);
  },

  createProduct: async (req, res) => {
    console.log(req.files, "crea el producto");
    let {
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      descuento,
      emprendimientos_id,
      images,
    } = req.body;
    const errors = validationResult(req);
    let photos = [];
    if (req.files) {
      req.files.forEach((image) => {
        photos.push(image.filename);
      });
    }

    let archivos = req.files;
    console.log(archivos);

    if (errors.isEmpty()) {
      try {
        const productResult = await insertProduct({
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          descuento: descuento,
          stock: stock,
          categoria_id: categoria_id,
          emprendimientos_id: emprendimientos_id,
        });

        if (productResult) {
          if (photos.length > 0) {
            const images = req.files.map((file) => {
              return {
                imagen: file.filename,
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
                "Ocurrio un error al insertar imagenes en la base de datos";
              return res
                .status(500)
                .json({ msg: ERROR_RESPONSE, error: error });
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
        return res.status(500).json({
          Error: "Ocurrió un error al crear el producto " + error,
        });
      }
    }
  },
  updateProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const Product = await getProductById(PRODUCT_ID);

    let {
      nombre,
      descripcion,
      precio,
      stock,
      descuento,
      emprendimientos_id,
      categoria_id,
    } = req.body;
    const errors = validationResult(req);
    let files = Product.images;

    let filesOld = [];

    let filesNew = [];

    if (errors.isEmpty()) {
      try {
        if (req.files) {
          const images = req.files.map((file) => {
            return {
              imagen: file.filename,
              productos_id: Product.id,
            };
          });
          filesNew.push(images);

          //filesOld.push(Product.images);
        }

        if (filesOld.length > 0) {
         Product.images.forEach((image) => {
            filesOld.push(image.imagen);
          });
          await deletedFiles("imagesProduct", filesOld);
        }
        const result = await updateProduct({
          id: PRODUCT_ID,
          nombre: nombre ? nombre : Product.nombre,
          descripcion: descripcion ? descripcion : Product.descripcion,
          precio: precio,
          stock: stock,
          emprendimientos_id: emprendimientos_id,
          descuento: descuento,
          categoria_id: categoria_id,
        });

        if (result) {
          try {
            const productImagesResult = await insertImagesProduct(filesNew);

            const SUCCESS_RESPONSE = "Producto actualizado satisfactoriamente";
            return res
              .status(201)
              .json({ msg: SUCCESS_RESPONSE, productImagesResult });
          } catch (error) {
            console.error(
              "Error al insertar imágenes en la base de datos:",
              error
            )}
          const SUCCESS_RESPONSE = "Producto actualizado satisfactoriamente";
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
          Error: "Ocurrió un error al actualizar el Producto " + error,
        });
      }
    }
  },
  deleteProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    try {
      const product = await getProductById(PRODUCT_ID);
      let files = product.images;
      //console.log(product.images, "imagenes a borrar");
      let fotosBorrar = [];
      if (files.length > 0) {
        files.forEach((image) => {
          fotosBorrar.push(image.imagen);
        });
      }

      await deletedFiles("imagesProduct", fotosBorrar);
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
