const {TypeFiles} = require('../models');

const createTypeFile = async (req,res)=>{
    const data = req.body 
    try {
        const result = await TypeFiles.create(data)
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}
const deleteTypeFile = async (req,res)=>{
    const id = parseInt(req.params.id)
    try {
        const result = TypeFiles.findOne({
            where:{
                id
            }
        })
        if(result){
            await TypeFiles.destroy({
                where:{
                    id
                }
            })
            res.status(200).send("Delete success !")
        }else{
            res.status(404).send("Not found !")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const updateTypeFile = async (req,res)=>{
    const data = req.body;
    const id = parseInt(req.params.id)
    try {
        const result = await TypeFiles.update(data,{
            where:{
                id
            }
        })
        if(result){
            res.status(200).send({
                message:"Update success !",
                data:result
            })
        }else{
            res.status(404).send("Not found !")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const getAllTypeFile = async (req,res)=>{
    try {
        const result = await TypeFiles.findAll();
        if(result){
            res.status(200).send(result)
        }else{
            res.status(404).send("Not found !")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createTypeFile,
    deleteTypeFile,
    updateTypeFile,
    getAllTypeFile

}