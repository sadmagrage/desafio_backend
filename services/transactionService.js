const axios = require("axios");

const User = require("../models/UserModel");
const Transaction = require("../models/TransactionModel");
const CustomError = require("../errors/CustomError");

const efectuate = async (senderDocument, receiverDocument, value) => {
    const sender = await User.findOne({ where: { document: senderDocument } });
    const receiver = await User.findOne({ where: { document: receiverDocument } });

    if (!sender) throw new CustomError("Sender não encontrado.", 404);
    if (!receiver) throw new CustomError("Receiver não encontrado.", 404);
    if (sender.balance < value) throw new CustomError("Saldo insuficiente.", 422);
    if (sender.consumer != "cliente") throw new CustomError("Apenas clientes podem fazer transferências.", 403);

    const mock = await axios.get("https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6")
        .then(permission => permission.data)
        .then(permission => permission.message != "Autorizado");

    if (mock) throw new CustomError("Transfência não autorizada.", 401);

    sender.balance -= value;
    receiver.balance += value;

    const transaction = Transaction.build({ sender_document: senderDocument, sender_balance: sender.balance, receiver_document: receiverDocument, receiver_balance: receiver.balance, value: value });
    
    await sender.save();
    await receiver.save();

    await transaction.save();

    return transaction;
};

module.exports = { efectuate };