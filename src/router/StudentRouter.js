const express = require("express");
const { jwtAuth } = require("../auth/Auth");
const StudentController = require("../controller/StudentController");

const router = express.Router();

router.post("/registration", jwtAuth, StudentController.registration);

router.get("/getAllStudents", jwtAuth, StudentController.getAllStudents);

router.get("/getUserData",jwtAuth,StudentController.getUserData);

router.put("/updateStudent", jwtAuth, StudentController.updateStudent);

module.exports = router;
