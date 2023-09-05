const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const User = sequelize.define("user", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    consumer: {
        type: DataTypes.ENUM("cliente", "lojista"),
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: () => {
            const randomValue = Math.random() * 10000;
            return randomValue;
        }
    }
});

module.exports = User;