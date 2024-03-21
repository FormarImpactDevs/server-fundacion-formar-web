const { PuntoDeRetiro } = require("../database/models");

const getAllPoints = async () => {
  try {
    return await PuntoDeRetiro.findAll();
  } catch (error) {
    console.error("Error while fetching points:", error);
    throw new Error("Error fetching points");
  }
};

const getPointById = async (pointId) => {
  try {
    const point = await PuntoDeRetiro.findByPk(pointId);
    if (!point) {
      throw new Error("Error al obtener el Punto de retiro");
    }
    return point;
  } catch (error) {
    console.error("Error al obtener el Punto de retiro: ", error);
    throw new Error("Error al obtener el Punto de retiro");
  }
};

const insertPoint = async (pointData) => {
  try {
    return await PuntoDeRetiro.create(pointData);
  } catch (error) {
    console.error("Error al insertar un Punto de retiro:", error);
    throw new Error("Error al insertar un Punto de retiro");
  }
};

const updatePoint = async (pointData) => {
  try {
    return await PuntoDeRetiro.update(pointData, {
      where: { id: pointData.id },
    });
  } catch (error) {
    console.error("Error al actualizar un Punto de retiro:", error);
    throw new Error("Error al actualizar un Punto de retiro");
  }
};

const deletePoint = async (pointId) => {
  try {
    return await PuntoDeRetiro.destroy({ where: { id: pointId } });
  } catch (error) {
    console.error("Error al tratar de eliminar un Punto de retiro:", error);
    throw new Error("Error al tratar de eliminar un Punto de retiro");
  }
};

module.exports = {
  getAllPoints,
  getPointById,
  insertPoint,
  updatePoint,
  deletePoint,
};
