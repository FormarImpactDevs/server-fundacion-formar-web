const { Enterprise } = require("../database/models");
const { deleteProduct } = require("./product.service");

const getEnterprises = async () => {
  try {
    const enterprise = await Enterprise.findAll({
      include: [{ association: "products" }],
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
        {
          association: "products",
          include: [
            {
              association: "images",
            },
          ],
        },
      ],
    });
    return enterprise;
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

    return enterprise;
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
    return await Enterprise.update(enterpriseData, {
      where: { id: enterpriseData.id },
    });
  } catch (error) {
    console.error("Error al actualizar un Emprendimiento:", error);
    throw new Error("Error al actualizar un Emprendimiento");
  }
};

const deleteEnterprise = async (enterpriseId) => {
  try {
    // Buscar el emprendimiento por su ID junto con sus productos y sus imágenes asociadas
    const enterprise = await Enterprise.findByPk(enterpriseId, {
      include: [
        {
          association: "products",
          include: [
            {
              association: "images",
            },
          ],
        },
      ],
    });

    // Eliminar cada producto asociado al emprendimiento de forma asíncrona
    await Promise.all(
      enterprise.products.map(async (product) => {
        await deleteProduct(product.id);
      })
    );

    // Una vez eliminados los productos, eliminar el emprendimiento
    await Enterprise.destroy({ where: { id: enterpriseId } });

    return "Ok";
  } catch (error) {
    console.error("Error al intentar eliminar un Emprendimiento:", error);
    return "Ocurrió un error al intentar eliminar el emprendimiento y sus productos asociados.";
  }
};

module.exports = {
  getEnterprises,
  getEnterpriseById,
  getEnterpriseByName,
  insertEnterprise,
  updateEnterprise,
  deleteEnterprise,
};
