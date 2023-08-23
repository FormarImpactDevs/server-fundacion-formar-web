const { generateToken } = require("../../helpers/jwt.helper");
const {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("../../services/users.service");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (req, res) => { //se encarga de obtener la lista de usuarios y enviarla como respuesta al cliente
    try {
      const users = await getUsers();
      const usersResponse = users.map(({ id, nombre, email }) => {
        return {
          id,
          nombre,
          email,
          detail: `/api/users/${id}`,
        };
      }); //version simplicada que solo incluye id, nombre y email. el datail trae una url para ver mas sobre ese usuario

      const RESPONSE = {
        count: users.length,
        users: usersResponse,
      }; //contiene la cantidad de usuarios y la lista de usuarios formateados

      return res.status(200).json(RESPONSE); //si todo va bien responde al cliente y envia la respuesta en formato json 
    } catch (error) {
      return res.status(500).json({ Error: error }); //si va mal envía un objeto JSON que contiene información sobre el error
    }
  },
  getUserById: async (req, res) => { //obtiene los detalles de un usuario específico por su ID
    try {
      const USER_ID = req.params.id; //contiene los detalles del usuario obtenidos de la base de datos
      const { id, nombre, email } = await getUserById(
        USER_ID
      );

      const USER_DATA_RESPONSE = {
        id,
        nombre,
        email,
      };

      return res.status(200).json(USER_DATA_RESPONSE);
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  createUser: async (req, res) => {
    try {
      const result = await insertUser({ 
        ...req.body,
        password: bcrypt.hashSync(req.body.pass, 10) //clave cifrada de manera segura antes de guardarse en la base de datos
       });

      if (result) {
        const SUCCESS_RESPONSE = "User created successfully";
        return res.status(201).json({ msg: SUCCESS_RESPONSE });
      } else {
        const ERROR_RESPONSE = "Somethings wrong";
        return res.status(400).json({ msg: ERROR_RESPONSE });
      }
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      const token = generateToken(user);

      return res.status(200).json({token})
    } catch (error) {
      return res.status(500).json({ Error: "Token error " + error });
    }
  },
  updateUser: async (req, res) => {},
  deleteUser: async (req, res) => {},
};