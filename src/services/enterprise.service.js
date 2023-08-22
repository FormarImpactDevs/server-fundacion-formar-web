const { Enterprise } = require("../database/models");

const getEnterprises = async () => {
    console.log(Enterprise);
  try {
    const enterprise = await Enterprise.findAll();

    return enterprise;
  } catch (error) {
    console.error("Error while fetching Enterprise: ", error);
    throw new Error("Error while fetching Enterprise");
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
    console.error("Error while fetching enterprise: ", error);
    throw new Error("Error while fetching enterprise");
  }
};


const insertEnterprise = async (enterpriseData) => {
    try {
      return await Enterprise.create(enterpriseData);
    } catch (error) {
      console.error("Error while insert Enterprise:", error);
      throw new Error("Error insert Enterprise");
    }
  };
  
  const updateEnterprise = async (enterpriseData) => {
    try {
      return await Enterprise.update(enterpriseData, { where: { id: enterpriseData.id } });
    } catch (error) {
      console.error("Error while update Enterprise:", error);
      throw new Error("Error update Enterprise");
    }
  };
  
  const deleteEnterprise = async (enterpriseId) => {
    try {
      return await Enterprise.destroy({ where: { id: enterpriseId } });
    } catch (error) {
      console.error("Error while delete enterprise:", error);
      throw new Error("Error delete enterprise");
    }
  };

module.exports = {
    getEnterprises,
    getEnterpriseById,
    insertEnterprise,
    updateEnterprise,
    deleteEnterprise 
}
