const express = require("express");
const { jwtAuth } = require("../auth/Auth");
const TeacheerController = require("../controller/TeacheerController");

const router = express.Router();

router.post("/addNewTeacher", jwtAuth, TeacheerController.addNewTeacher);

module.exports = router;