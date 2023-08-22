const express = require("express");
const router = express.Router();

const {
getEnterprises,
getEnterpriseById,
createEnterprise,
updateEnterprise,  
deleteEnterprise
} = require("../controllers/enterprise");

router
  .get("/", getEnterprises)
  .get("/:id", getEnterpriseById) 
  .post("/create", createEnterprise)
  .put("/:id", updateEnterprise)
  .delete("/:id", deleteEnterprise);

module.exports = router;