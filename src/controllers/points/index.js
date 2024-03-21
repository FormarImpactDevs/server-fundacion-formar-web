const { Point } = require("../../database/models");
const {
  getAllPoints,
  getPointById,
  insertPoint,
  updatePoint,
  deletePoint,
} = require("../../services/points.service");
const sendResponse = require("../../utils/sendResponse");
const { validationResult } = require("express-validator");

module.exports = {
  getPoints: async (req, res) => {
    try {
      const points = await getAllPoints();
      return sendResponse(res, 200, "Lista de todos puntos de retiro", points);
    } catch (error) {
      return sendResponse(
        res,
        500,
        "Error al tratar de obtener la lista de puntos de retiro",
        error
      );
    }
  },
  getPointById: async (req, res) => {
    const POINT_ID = req.params.id;
    try {
      const point = await getPointById(POINT_ID);
      return sendResponse(
        res,
        200,
        `Punto de retiro con id : ${POINT_ID}`,
        point
      );
    } catch (error) {
      return sendResponse(
        res,
        500,
        `Error al tratar de obtener el Punto de retiro con id : ${POINT_ID}`,
        error
      );
    }
  },
  createPoint: async (req, res) => {
    const { nombre, descripcion, telefono } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const result = await insertPoint({
          nombre,
          descripcion,
          telefono,
        });

        return sendResponse(
          res,
          201,
          "Punto de retiro creado satisfactoriamente",
          result
        );
      } catch (error) {
        return sendResponse(
          res,
          500,
          "Ocurrió un error al tratar de crear el Punto de retiro ",
          error
        );
      }
    } else {
      return sendResponse(
        res,
        500,
        "Ocurrió un error al tratar de crear el Punto de retiro ",
        errors
      );
    }
  },
  updatePoint: async (req, res) => {
    const POINT_ID = req.params.id;
    const point = await getPointById(POINT_ID);

    const { nombre, descripcion, telefono } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const result = await updatePoint({
          id: POINT_ID,
          nombre: nombre || point.nombre,
          descripcion: descripcion || point.descripcion,
          telefono: telefono || point.telefono,
        });

        const SUCCESS_RESPONSE =
          "Punto de retiro actualizado satisfactoriamente";

        return sendResponse(res, 201, SUCCESS_RESPONSE, result);
      } catch (error) {
        return sendResponse(
          res,
          500,
          "Ocurrió un error al tratar de actualizar el Punto de retiro ",
          error
        );
      }
    } else {
      return sendResponse(
        res,
        500,
        "Ocurrió un error al tratar de actualizar el Punto de retiro ",
        errors
      );
    }
  },

  deletePoint: async (req, res) => {
    const POINT_ID = req.params.id;
    try {
      const result = await deletePoint(POINT_ID);

      const SUCCESS_RESPONSE = "Punto de retiro eliminado satisfactoriamente";
      return sendResponse(res, 201, SUCCESS_RESPONSE, result);
    } catch (error) {
      return sendResponse(
        res,
        500,
        `Ocurrió un error al tratar de eliminar el Punto de retiro con id : ${POINT_ID}`,
        error
      );
    }
  },
};
