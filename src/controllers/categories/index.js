const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../services/category.service");

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

module.exports = {
  getCategories: async (req, res) => {
    try {
      const category = await getCategories();
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ massage: error.massage });
    }
  },

  getCategoryById: async (req, res) => {
    const categoryId = req.params.id;

    try {
      const category = await getCategoryById(categoryId);

      if (category !== null) {
        const response = {
          endpoint: `/category/${categoryId}`,
          data: category,
        };

        return res.status(200).json(response);
      } else {
        sendErrorResponse(
          res,
          400,
          `Categoría con id: ${categoryId} no existe`
        );
      }
    } catch (error) {
      return sendErrorResponse(res, 500, "Error al obtener categoría");
    }
  },
  createCategory: async (req, res) => {
    try {
      const result = await createCategory({
        ...req.body,
      });

      if (result) {
        const SUCCESS_RESPONSE = "Categoría creada satisfactoriamente";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ups, ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },

  updateCategory: async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ Error: "Categoría no encontrada" });
    }

    try {
      const updatedData = {
        nombre: req.body.nombre ? req.body.nombre : category.nombre,
      };

      const result = await updateCategory(categoryId, updatedData);

      if (result) {
        const SUCCESS_RESPONSE = "Categoría actualizada satisfactoriamente";
        return res.status(200).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },

  deleteCategory: async (req, res) => {
    //const categoryId = req.params.id;
    const { id, categoryProducts } = req.params;
    try {
      let result;

      if (!categoryProducts || categoryProducts === "null") {
        result = await deleteCategory(id, null);
      } else {
        result = await deleteCategory(id, categoryProducts);
      }

      if (result) {
        const SUCCESS_RESPONSE = "Categoría eliminada satisfactoriamente";
        return res.status(201).json({ msg: SUCCESS_RESPONSE, status: 201 });
      } else {
        const ERROR_RESPONSE = "Erro al eliminar la categría";
        return res.status(400).json({ msg: ERROR_RESPONSE, status: 400 });
      }
    } catch (error) {
      return res.status(500).json({ Error: error, status: 500 });
    }
  },
};
