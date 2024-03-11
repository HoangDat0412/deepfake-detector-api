const {Users,Checkfiles} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
// const sendmail = require('../middleware/mail')
const createUser = async (req,res)=>{
    const data = req.body;
    // tạo ra 1 chuỗi ngẫu nhiên 
    const salt = bcrypt.genSaltSync(10);
    // mã hóa mật khẩu với salt 
    const password = bcrypt.hashSync(data.password,salt)
    data.password = password;
    data.type = "USER";

    try {
        const user = await Users.findOne({
            where:{
                email:data.email
            }
        })
        if(user){
            res.status(400).send("Email đã tồn tại")
        }else{
            const newUser = await Users.create(data)
            res.status(201).send(newUser)
        }
    } catch (error) {
        res.status(505).send(error)
    }
}
const getUser = async (req,res)=>{
    try {
        const users = await Users.findAll();
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).send("Not found")
        }
    } catch (error) {
        res.status(505).send(error)
    }

}
const login = async (req,res)=>{
   
    const {email,password} = req.body;
    try {
        const user = await Users.findOne({
            where:{
                email:email
            }
        })
        if (user) {
            const match = bcrypt.compareSync(password,user.password)
            if(match){
                const token = jwt.sign({id:user.id,type:user.type},"20112003",{expiresIn:3600*72})
                res.status(200).send({
                    message:"Login success",
                    token:token
                })
            }else{
                res.status(500).send({
                    message:"email or password not correct"
                })
            }
        } else {
            res.status(404).send(`Not found user have email ${email}`)
        }
    } catch (error) {
        res.status(505).send(error)
    }
}
const updateUser = async (req,res)=>{
    const id = req.params.id;
    const numberId = parseInt(id)
    const data = req.body
    try {
        await Users.update(data,{
            where :{
                id:numberId
            }
        })
        const result = await Users.findOne({
            where:{
                id:numberId
            }
        })
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send("Not found")
        }
    } catch (error) {
        res.status(505).send(error)
    }
}
const deleteUser = async (req,res)=>{
    const id = req.params.id
    const ID = parseInt(id)
    try {
         const listCheckFile = await Checkfiles.findAll({
            where :{
                userid:ID
            }
         })
         if(listCheckFile){
            listCheckFile.map((item)=>{
                console.log(item.file);
                fs.unlinkSync(item.file);
             })
            await Checkfiles.destroy({
                where : {
                    userid:ID
                }
            })
         }
         await Users.destroy({
            where: {
              id:ID
            }
          });
          res.status(200).send("Delete successful !")
        
    } catch (error) {
        res.status(500).send(error)
    }
}
const getUserInformation = async (req,res)=>{
    const id = parseInt(req.user.id)
    try {
        let user = await Users.findOne({
            where:{
                id
            }
        })


        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}
const getUserFromId = async (req,res)=>{
    const id = parseInt(req.params.id)
    try {
        let user = await Users.findOne({
            where:{
                id
            }
        })
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}
const setAvatar = async (req,res)=>{
    const file = req.file;
    const urlImage = `${file.path}`
    const {user} = req;
    const userfound = await Users.findOne({
        where :{
            id:user.id
        }
    })
    userfound.avatar = urlImage
    userfound.save()
    res.send(userfound)
}
const userUpdateInformation = async (req,res)=>{
        const id = parseInt(req.user.id)
        const {name,email} = req.body
        const salt = bcrypt.genSaltSync(10);
        // mã hóa mật khẩu với salt 
        const pw =req.body.password
        const password = bcrypt.hashSync(pw,salt)
        const data = {
            name,
            email,
            password
        }

    try {

        await Users.update(data,{
            where :{
                id:id
            }
        })

        res.status(200).send({
            message:"update success",
        })
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const searchUser = async (req,res)=>{
    const {email} = req.body
    try {
        const user = await Users.findOne({
            where:{
                email
            }
        })
        if (user) {
            res.status(200).send(user)
        }else{
            res.status(404).send("not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createUser,
    getUser,
    login,
    updateUser,
    deleteUser,
    getUserInformation,
    getUserFromId,
    setAvatar,
    userUpdateInformation,
    searchUser
}