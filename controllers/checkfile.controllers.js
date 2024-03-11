const {Checkfiles,Users,TypeFiles} = require('../models');
const fs = require('fs');
const checkfile = (type)=>{
    return async (req,res)=>{
        const file = req.file;
        let linkfile = file.path
        if(process.env.NODE_ENV ==='production'){
            linkfile = linkfile.slice(linkfile.indexOf("/public"));
            linkfile = `http://117.1.29.215:5000${linkfile}`
        }else{
            linkfile = `http://localhost:5000${linkfile}`
        }
        const urlImage = `${file?.path}`
        const userid = parseInt(req.user.id);
        try {
            const typefile = await TypeFiles.findOne({
                where : {
                    typename:type
                }
            })
            const user = await Users.findOne({
                where :{
                    id:userid
                }
            })
            if(user.type !== "ADMIN"){
                if(user.wallet < typefile.moneypay){
                    fs.unlinkSync(urlImage);
                    return res.status(400).send("Tài khoản của bạn không đủ tiền")
                }
            }
            const result = await Checkfiles.create({
                userid,
                des:"Ok",
                file:urlImage,
                urlfile:linkfile,
                type:type
            })

            if(user.type !== "ADMIN"){
                user.wallet = user.wallet - typefile.moneypay;
                user.save()
            }
            res.status(201).send(result)
        } catch (error) {
            fs.unlinkSync(urlImage);
            res.status(500).send(error)
        }
    }
}

const getCheckfiles = async (req,res)=>{
    const userid = parseInt(req.user.id)
    try {
        const result = await Checkfiles.findAll({
            where : {
                userid
            }
        })
        if(result){
            const data = result.slice(0,9)
            res.status(200).send(data)
        }else{
            res.status(404).send("not found !")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllCheckfile = async (req,res)=>{
    try {
        const result = await Checkfiles.findAll()
        if(result){
            res.status(200).send(result)
        }else{
            res.status(404).send("not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteCheckfile = async (req,res)=>{
    const id = parseInt(req.params.id);
    const userid = req.user.id;
    try {
        const checkfile = await Checkfiles.findOne({
            where:{
                id
            }
        })
        if(checkfile){
            if(userid === checkfile.userid){
                fs.unlinkSync(checkfile.file);
                await Checkfiles.destroy({
                    where : {
                        id
                    }
                })
                return res.status(200).send("delete success !")
            }else{
                return res.status(401).send("you do not have access !")
            }
        }else{
            return res.status(404).send("not found !")
        }
    } catch (error) {
        
    }

}
module.exports = {
    checkfile,
    getCheckfiles,
    deleteCheckfile
}