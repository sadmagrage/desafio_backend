const transactionService = require("../services/transactionService");
const CustomError = require("../errors/CustomError");

const efectuate = async (req, res) => {
    try {
        const response = await transactionService.efectuate(req.body.sender, req.body.receiver, req.body.value);

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
        }
        else {
            res.status(500).json(error.message);
        }
    }
};

module.exports = { efectuate };