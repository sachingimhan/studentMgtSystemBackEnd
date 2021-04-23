const express = require("express");
const { jwtAuth } = require("../auth/Auth");
const LoginController = require("../controller/LoginController");

const router = express.Router();

router.post("/stdlogin", LoginController.stdLogin);

router.post("/teclogin", LoginController.tecLogin);

module.exports = router;
