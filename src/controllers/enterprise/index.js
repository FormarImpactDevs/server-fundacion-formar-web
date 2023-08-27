const {
  getEnterprises,
  getEnterpriseById,
  getEnterpriseByName,
  insertEnterprise,
  updateEnterprise,
  deleteEnterprise,
} = require("../../services/enterprise.service");

const deletedFiles = require("../../utils/deletedFiles");

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
    let { nombre, descripcion } = req.body;

    try {
      const exist = await getEnterpriseByName(nombre);
      if (exist) {
        let fotoCard = req.files.foto_card[0].filename ?? "";
        let fotoEmprendimiento = req.files.foto_emprendimiento[0].filename ?? "";
        let files = [fotoCard, fotoEmprendimiento];
        await deletedFiles("imagesEnterprises", files);
        return res
          .status(400)
          .json({ msg: "Ya existe un emprendimiento con ese nombre" });
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
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  updateEnterprise: async (req, res) => {
    const ENTERPRISE_ID = req.params.id;
    const Enterprise = await getEnterpriseById(ENTERPRISE_ID);

    let { nombre, descripcion } = req.body;

    let filesOld = [];

    try {
      if (req.files.foto_card[0]) {
        filesOld.push(Enterprise.foto_card);
      }

      if (req.files.foto_emprendimiento[0]) {
        filesOld.push(Enterprise.foto_emprendimiento);
      }

      if (filesOld.length > 0) {
        await deletedFiles("imagesEnterprises", filesOld);
      }

      const result = await updateEnterprise({
        id: ENTERPRISE_ID,
        nombre: nombre ? nombre : Enterprise.nombre,
        descripcion: descripcion ? descripcion : Enterprise.descripcion,
        foto_card: req.files.foto_card[0]
          ? req.files.foto_card[0].filename
          : Enterprise.foto_card,
        foto_emprendimiento: req.files.foto_emprendimiento[0]
          ? req.files.foto_emprendimiento[0].filename
          : Enterprise.foto_emprendimiento,
      });

      if (result) {
        const SUCCESS_RESPONSE =
          "Emprendimiento actualizado satisfactoriamente";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
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
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Ocurrió un error";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
};
