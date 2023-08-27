const { 
    getCategories, 
    getCategoryById,
 } = require("../../services/category.service");

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await getCategories();
      
      const response = {
        endpoint: "/category",
        data: categories,
        total: categories.length,
      };

      res.status(200).json(response);
    } catch (error) {
      sendErrorResponse(res, 500, "Error fetching categories");
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

        res.status(200).json(response);
      } else {
        sendErrorResponse(res, 400, `La categoría con id: ${categoryId} no existe`);
      }
    } catch (error) {
      sendErrorResponse(res, 500, "Error fetching category");
    }
  },
};