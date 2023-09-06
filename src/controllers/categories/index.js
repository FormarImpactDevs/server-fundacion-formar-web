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

        sendErrorResponse(res, 400, `Category with id: ${categoryId} does not exist`);

      }
    } catch (error) {
       return sendErrorResponse(res, 500, "Error fetching category");
    }
  },
  createCategory: async (req, res) => {
    try {
      const result = await createCategory({
        ...req.body,
      });

      if (result) {
        const SUCCESS_RESPONSE = "category created successfully";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Somethings wrong";
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
      return res.status(404).json({ Error: "Category not found" });
    }
  
    try {
      const updatedData = {
        nombre: req.body.nombre ? req.body.nombre : category.nombre,
      };
      
      const result = await updateCategory(categoryId, updatedData);
  
      if (result) {
        const SUCCESS_RESPONSE = "Category updated successfully";
        return res.status(200).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Something's wrong";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },

  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;
    try {
      const result = await deleteCategory(categoryId);

      if (result) {
        const SUCCESS_RESPONSE = "category deleted successfully";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Somethings wrong";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
};