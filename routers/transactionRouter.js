const express = require("express");
const bodyParser = require("body-parser");

const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.use(bodyParser.json());

router.post("", transactionController.efectuate);

module.exports = { router };