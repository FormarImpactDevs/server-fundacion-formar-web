const express = require("express");
const router = express.Router()
const { insertNotification } = require("../controllers/notificationMP")

router
    .post("/", insertNotification);

module.exports = router;