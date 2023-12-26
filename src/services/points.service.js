const { PuntoDeRetiro } = require("../database/models");

const getAll = async () => {
  try {
    return await PuntoDeRetiro.findAll();
  } catch (error) {
    console.error("Error while fetching points:", error);
    throw new Error("Error fetching points");
  }
};

module.exports = {
  getAll,
};