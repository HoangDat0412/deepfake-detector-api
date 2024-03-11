const {Checkouts,Users} = require('../models');

const createCheckout  = async (req,res)=>{
    const userid = parseInt(req.user.id)
    const payment_method = req.body.payment_method
    const data = req.body;
    //1405953168
    if(payment_method === "bitcoin"){
        data.moneypay = data.moneypay*1405953168;
    }
    try {
        const result = await Checkouts.create({
            userid,
            ...data
        })
        const user = await Users.findOne({
            where:{
                id:userid
            }
        })
        user.wallet =user.wallet+ data.moneypay
        user.save()
        res.status(200).send("Check out success")
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllCheckout = async (req,res)=>{
    try {
        const result = await Checkouts.findAll()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createCheckout,
    getAllCheckout
}