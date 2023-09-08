const {
  getEnterprises,
  getEnterpriseById,
  getEnterpriseByName,
  insertEnterprise,
  updateEnterprise,
  deleteEnterprise,
} = require("../../services/enterprise.service");

const deletedFiles = require("../../utils/deletedFiles");
const sendResponse = require("../../utils/sendResponse");

const { validationResult } = require("express-validator");

module.exports = {
  getEnterprises: async (req, res) => {
    try {
      const enterprises = await getEnterprises();
      return sendResponse(
        res,
        200,
        "Lista de todos emprendimientos",
        enterprises
      );
    } catch (error) {
      return sendResponse(
        res,
        500,
        "Error al tratar de obtener la lista de emprendimientos",
        error
      );
    }
  },

  getEnterpriseById: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    const Enterprise = await getEnterpriseById(ENTERPRISE_ID);

    return sendResponse(
      res,
      200,
      `Emprendimiento con id : ${ENTERPRISE_ID}`,
      Enterprise
    );
  },

  createEnterprise: async (req, res) => {
    let { nombre, descripcion } = req.body;
    const errors = validationResult(req);

    let photos = [];
    if (req.files.foto_card) {
      photos.push(req.files.foto_card[0].filename);
    }

    if (req.files.foto_emprendimiento) {
      photos.push(req.files.foto_emprendimiento[0].filename);
    }

    if (errors.isEmpty()) {
      try {
        const exist = await getEnterpriseByName(nombre);

        if (exist) {
          // Elimina las imagenes subidas si el emprendimiento ya existe
          if (photos.length > 0) {
            await deletedFiles("imagesEnterprises", photos);
          }
          return sendResponse(
            res,
            400,
            "Ya existe un emprendimiento con ese nombre"
          );
        }

        const result = await insertEnterprise({
          nombre: nombre,
          descripcion: descripcion,
          foto_card: req.files.foto_card
            ? req.files.foto_card[0].filename
            : "default-image.png",
          foto_emprendimiento: req.files.foto_emprendimiento
            ? req.files.foto_emprendimiento[0].filename
            : "default-image.png",
        });

        if (result) {
          const SUCCESS_RESPONSE = "Emprendimiento creado satisfactoriamente";
          return sendResponse(res, 201, SUCCESS_RESPONSE);
        } else {
          if (photos.length > 0) {
            await deletedFiles("imagesEnterprises", photos);
          }
          const ERROR_RESPONSE = "Ocurrió un error";
          return sendResponse(res, 400, ERROR_RESPONSE);
        }
      } catch (error) {
        return sendResponse(
          res,
          500,
          "Ocurrió un error al tratar de crear el emprendimiento ",
          error
        );
      }
    } else {
      console.log(photos + "error");
      if (photos.length > 0) {
        await deletedFiles("imagesEnterprises", photos);
      }

      return sendResponse(
        res,
        500,
        "Ocurrió un error al tratar de crear el emprendimiento ",
        errors.mapped()
      );
    }
  },
  updateEnterprise: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    const Enterprise = await getEnterpriseById(ENTERPRISE_ID);

    let { nombre, descripcion } = req.body;

    let filesOld = [];

    let filesNew = [];

    try {
      if (req.files.foto_card) {
        filesOld.push(Enterprise.foto_card);
        filesNew.push(req.files.foto_card[0].filename);
      }

      if (req.files.foto_emprendimiento) {
        filesOld.push(Enterprise.foto_emprendimiento);
        filesNew.push(req.files.foto_emprendimiento[0].filename);
      }

      if (filesOld.length > 0) {
        await deletedFiles("imagesEnterprises", filesOld);
      }
      const result = await updateEnterprise({
        id: ENTERPRISE_ID,
        nombre: nombre ? nombre : Enterprise.nombre,
        descripcion: descripcion ? descripcion : Enterprise.descripcion,
        foto_card: req.files.foto_card
          ? req.files.foto_card[0].filename
          : Enterprise.foto_card,
        foto_emprendimiento: req.files.foto_emprendimiento
          ? req.files.foto_emprendimiento[0].filename
          : Enterprise.foto_emprendimiento,
      });

      if (result) {
        const SUCCESS_RESPONSE =
          "Emprendimiento actualizado satisfactoriamente";

        return sendResponse(res, 201, SUCCESS_RESPONSE, result);
      } else {
        if (filesNew.length > 0) {
          await deletedFiles("imagesEnterprises", filesNew);
        }
        const ERROR_RESPONSE = "Ocurrió un error";
        return sendResponse(res, 400, ERROR_RESPONSE, result);
      }
    } catch (error) {
      if (filesNew.length > 0) {
        await deletedFiles("imagesEnterprises", filesNew);
      }

      return sendResponse(
        res,
        500,
        "Ocurrió un error al tratar de actualizar el Emprendimiento ",
        error
      );
    }
  },
  deleteEnterprise: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    try {
      const enterprise = await getEnterpriseById(ENTERPRISE_ID);
      let files = [enterprise.foto_card, enterprise.foto_emprendimiento];
      // Borro las imagenes del directorio
      await deletedFiles("imagesEnterprises", files);
      // Elimino el emprendimiento de la base de datos
      const result = await deleteEnterprise(ENTERPRISE_ID);

      if (result) {
        const SUCCESS_RESPONSE = "Emprendimiento eliminado satisfactoriamente";
        return sendResponse(res, 201, SUCCESS_RESPONSE, result);
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return sendResponse(res, 400, ERROR_RESPONSE);
      }
    } catch (error) {
      return sendResponse(
        res,
        500,
        `Ocurrió un error al tratar de eliminar el Emprendimiento con id : ${ENTERPRISE_ID}`,
        error
      );
    }
  },
};
