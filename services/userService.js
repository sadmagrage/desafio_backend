const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");

const saveUser = async (userParam) => {
    const documentExists = await User.findOne({ where: { document: userParam.document } });
    const emailExists = await User.findOne({ where: { email: userParam.email } });

    if (documentExists) throw new CustomError("CPF/CNPJ already exists.", 409);
    if (emailExists) throw new CustomError("E-mail already exists.", 409);
    
    const user = User.build({ fullName: userParam.nome, document: userParam.document, email: userParam.email, password: userParam.password, consumer: userParam.consumidor });

    await user.save();

    return user;
}

module.exports = { saveUser }