const {
  getEnterprises,
  getEnterpriseById,
  insertEnterprise,
  updateEnterprise,
  deleteEnterprise,
} = require("../../services/enterprise.service");

module.exports = {
  getEnterprises: async (req, res) => {
    try {
      const enterprises = await getEnterprises();
      return res.status(200).json(enterprises);
    } catch (error) {
      return res.status(500).json({ massage: error.massage });
    }
  },

  getEnterpriseById: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    const Enterprise = await getEnterpriseById(ENTERPRISE_ID);

    return res.status(200).json(Enterprise);
  },

  createEnterprise: async (req, res) => {
    try {
      const result = await insertEnterprise({
        ...req.body,
      });

      if (result) {
        const SUCCESS_RESPONSE = "Enterprise created successfully";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Somethings wrong";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  updateEnterprise: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    const Enterprise = await getEnterpriseById(ENTERPRISE_ID);
    // Validar si existe el registro a actualizar
   /*  if (!Enterprise || !Enterprise.id === ENTERPRISE_ID) {
      throw new Error("No se encontro la empresa");
    } */

    try {
      const result = await updateEnterprise({
        id: ENTERPRISE_ID,
        nombre: req.body.nombre ? req.body.nombre : Enterprise.nombre,
        descripcion: req.body.descripcion
          ? req.body.descripcion
          : Enterprise.descripcion,
        foto_card: req.body.foto_card
          ? req.body.foto_card
          : Enterprise.foto_card,
        foto_emprendimiento: req.body.foto_emprendimiento
          ? req.body.foto_emprendimiento
          : Enterprise.foto_emprendimiento,
      });

      if (result) {
        const SUCCESS_RESPONSE = "Enterprise updated successfully";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Somethings wrong";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  deleteEnterprise: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    try {
      const result = await deleteEnterprise(ENTERPRISE_ID);

      if (result) {
        const SUCCESS_RESPONSE = "Enterprise deleted successfully";
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
