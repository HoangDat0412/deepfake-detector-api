const express = require("express");
const UserRouter = require("./user.router");
const TypeFilesRouter = require("./typefiles.router");
const CheckfileRouter = require("./checkfiles.router");
const CheckoutRouter = require("./checkout.router");
const VnpayRouter = require("./vnpay.router");
const RootRouters = express.Router();

RootRouters.use("/user",UserRouter);
RootRouters.use('/typefiles',TypeFilesRouter)
RootRouters.use('/checkfile',CheckfileRouter)
RootRouters.use('/checkout',CheckoutRouter)
RootRouters.use('/vnpay',VnpayRouter)
module.exports = RootRouters