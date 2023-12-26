const { Point } = require("../../database/models");
const {
  getAll,
} = require("../../services/points.service");

// Listar todas las órdenes
async function getPoints(req, res) {
  try {
    const points = await getAll();
    return res.json(points);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Error al obtener los puntos de retiro" });
  }
}

module.exports = {
    getPoints,
};
