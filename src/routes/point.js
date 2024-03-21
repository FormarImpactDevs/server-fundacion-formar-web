const express = require("express");
const router = express.Router();
const {
  getPoints,
  getPointById,
  createPoint,
  updatePoint,
  deletePoint,
} = require("../controllers/points");

router
  .get("/", getPoints)
  .get("/:id", getPointById)
  .post("/create", createPoint)
  .put("/update/:id", updatePoint)
  .delete("/delete/:id", deletePoint);

module.exports = router;
