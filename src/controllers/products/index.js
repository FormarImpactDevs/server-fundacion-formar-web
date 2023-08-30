const { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
  
} = require("../../services/product.service");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await getProducts();
      const productsResponse = products.map(
        ({ id, nombre, precio, descripcion, descuento, stock, emprendimientos_id, categoria_id }) => {
          return {
            id, 
            nombre,
            precio,
            descripcion,
            descuento,
            stock, 
            emprendimientos_id,
            categoria_id,
            detail: `/api/product/${id}`
          };
        }
      );
      const getProductCountByCategory = (products) => {
        const categoryCount = {};

        for (const product of products) {
          const categoryName = product.categoria_id.nombre;

          if(categoryCount.hasOwnProperty(categoryName)){
            categoryCount[categoryName]++;
          }else{
            categoryCount[categoryName] = 1;
          }
        }

        return categoryCount;
      }

      const RESPONSE = {
        count: products.length,
        countByCategory: getProductCountByCategory(products),
        products: productsResponse,
      }

      return res.status(200).json(RESPONSE);
    } catch (error) {
        return res.status(500).json({ Error: error });
      }
  },
  getProductById: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const product = await getProductById(PRODUCT_ID);

    return res.status(200).json(product);
  },
  createProduct: async (req, res) => {
    try {
      const result = await createProduct({
        ...req.body,
      });

      if(result) {
        const success_response = "Product created successfully";
        return res.status(201).json({ msg: success_response});
      } else {
        const error_response = "Somethings wrong";
        return res.status(400).json({ msg: error_response});
      }
    } catch (error) {
      return res.status(500).json({ Error: error});
    }
  },
  updateProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
    const Product = await getProductById(PRODUCT_ID);
    try{
      const result = await updateProduct({
        id: PRODUCT_ID,
        nombre: req.body.nombre ? req.body.nombre : Product.nombre,
        precio: req.body.precio ? req.body.precio : Product.precio,
        descripcion: req.body.descripcion ? req.body.descripcion : Product.descripcion,
        descuento: req.body.descuento ? req.body.descuento : Product.descuento,
        stock: req.body.stock ? req.body.stock : Product.stock,
        emprendimientos_id: req.body.emprendimientos_id ? req.body.emprendimientos_id : Product.emprendimientos_id,
        categoria_id: req.body.categoria_id ? req.body.categoria_id : Product.categoria_id,
      });

      if(result) {
        const success_response = "Product created successfully";
        return res.status(201).json({ msg: success_response});
      } else {
        const error_response = "Somethings wrong";
        return res.status(400).json({ msg: error_response});
      }
    } catch (error) {
      return res.status(500).json({ Error: error});
    }
  },
  deleteProduct: async (req, res) => {
    const PRODUCT_ID = req.params.id;
  try {
    const result = await deleteProduct(PRODUCT_ID);
    
    if (result) {
      const success_response = "Enterprise deleted successfully";
      return res.status(201).json({ msg: success_response });
    } else {
      const error_response = "Somethings wrong";
      return res.status(400).json({ msg: error_response });
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
},
};