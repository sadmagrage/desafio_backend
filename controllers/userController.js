const path = require("path");

const User = require("../models/UserModel");
const userService = require("../services/userService");
const CustomError = require("../errors/CustomError");

const page = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
};

const cadastrar = async (req, res) => {
    try {
        const user = await userService.saveUser(req.body);
        
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
        }
        else {
            res.status(500).json(error.message);
        }
    }
};

const lista = async (req, res) => {
    const users = await User.findAll();

    res.json(users);
};

module.exports = { page, cadastrar, lista };