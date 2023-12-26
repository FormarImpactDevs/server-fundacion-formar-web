const express = require("express");
const router = express.Router();
const { getPoints } = require("../controllers/points");

router
    .get("/", getPoints);
    
module.exports = router;
