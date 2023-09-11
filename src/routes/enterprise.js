const express = require("express");
const router = express.Router();

const {
getEnterprises,
getEnterpriseById,
createEnterprise,
updateEnterprise,  
deleteEnterprise
} = require("../controllers/enterprise");

const { enterpriseValidationRules } = require("../validations/enterprise.validator");
// middleware para la carga de imagenes mediante multer
let uploadEnterpriseFile = require('../middlewares/uploadEnterprisesFiles')


router
  .get("/", getEnterprises)
  .get("/:id", getEnterpriseById) 
  .post("/create", uploadEnterpriseFile.fields([{ name: 'foto_card', maxCount: 1 }, { name: 'foto_emprendimiento', maxCount: 1 }]), enterpriseValidationRules(), createEnterprise)
  .put("/update/:id", uploadEnterpriseFile.fields([{ name: 'foto_card', maxCount: 1 }, { name: 'foto_emprendimiento', maxCount: 1 }]), enterpriseValidationRules(), updateEnterprise)
  .delete("/delete/:id", deleteEnterprise);

module.exports = router;