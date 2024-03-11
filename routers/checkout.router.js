const express = require("express");
const { createCheckout,getAllCheckout } = require("../controllers/checkout.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");


const CheckoutRouter = express.Router()
CheckoutRouter.post('/',authenticate,createCheckout)
CheckoutRouter.get('/',getAllCheckout)

module.exports = CheckoutRouter