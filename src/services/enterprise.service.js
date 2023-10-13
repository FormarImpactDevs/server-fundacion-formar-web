const { Enterprise } = require("../database/models");

const getEnterprises = async () => {    
  try {
    const enterprise = await Enterprise.findAll({
      include: [
          { association: "products" }
        ]
  });

    return enterprise;
  } catch (error) {
    console.error("Error al obtener Emprendimientos: ", error);
    throw new Error("Error al obtener Emprendimientos");
  }
};

const getEnterpriseById = async (enterpriseId) => {
  try {
    const enterprise = await Enterprise.findByPk(enterpriseId, {
        include: [
            { association: "products" }
          ],
    });

    return enterprise
  } catch (error) {
    console.error("Error al obtener el Emprendimiento: ", error);
    throw new Error("Error al obtener el Emprendimiento");
  }
};

const getEnterpriseByName = async (enterpriseName) => {
  try {
    const enterprise = await Enterprise.findOne({
      where: {
        nombre: enterpriseName,
      },
    });

    return enterprise
  } catch (error) {
    console.error("Error al obtener el Emprendimiento: ", error);
    throw new Error("Error al obtener el Emprendimiento");
  }
};


const insertEnterprise = async (enterpriseData) => {
    try {
      return await Enterprise.create(enterpriseData);
    } catch (error) {
      console.error("Error al insertar un Emprendimiento:", error);
      throw new Error("Error al insertar un Emprendimiento");
    }
  };
  
  const updateEnterprise = async (enterpriseData) => {
    try {
      return await Enterprise.update(enterpriseData, { where: { id: enterpriseData.id } });
    } catch (error) {
      console.error("Error al actualizar un Emprendimiento:", error);
      throw new Error("Error al actualizar un Emprendimiento");
    }
  };
  
  const deleteEnterprise = async (enterpriseId) => {
    try {
      return await Enterprise.destroy({ where: { id: enterpriseId } });
    } catch (error) {
      console.error("Error al tratar de eliminar un Emprendimiento:", error);
      throw new Error("Error al tratar de eliminar un Emprendimiento");
    }
  };

module.exports = {
    getEnterprises,
    getEnterpriseById,
    getEnterpriseByName,
    insertEnterprise,
    updateEnterprise,
    deleteEnterprise 
}
