const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/cadastrar", userController.page);

router.get("/lista", userController.lista);

router.post("/cadastrar", express.urlencoded(), userController.cadastrar);

module.exports = { router };