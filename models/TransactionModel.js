const { DataTypes } = require("sequelize");

const { sequelize } = require("../config/sequelize");

const Transaction = sequelize.define("transactions", {
    transaction_id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    sender_document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sender_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    receiver_document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiver_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Transaction;