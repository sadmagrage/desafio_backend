const express = require("express");

const ClienteModel = require("./models/UserModel");
const TransactionModel = require("./models/TransactionModel");
const { router: userRouter } = require("./routers/userRouter");
const { router: transactionRouter } = require("./routers/transactionRouter");

const app = express();

app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

const port = 3001;

ClienteModel.sync()
    .then(() => {
        TransactionModel.sync()
            .then(() => {
                app.listen(port, () => console.log("running in port " + port));
            });
    });
