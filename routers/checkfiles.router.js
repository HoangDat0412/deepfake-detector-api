const express = require("express");
const { checkfile,getCheckfiles,deleteCheckfile} = require("../controllers/checkfile.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const { uploadFile } = require("../middlewares/upload/uploadimage")
const path = require("path");
const CheckfileRouter = express.Router()
CheckfileRouter.post('/image',authenticate,uploadFile("image"),checkfile("image"))
CheckfileRouter.post('/video',authenticate,uploadFile("video"),checkfile("video"))
CheckfileRouter.post('/void',authenticate,uploadFile("void"),checkfile("void"))
CheckfileRouter.get('/user/history',authenticate,getCheckfiles)
CheckfileRouter.delete('/:id',authenticate,deleteCheckfile)

CheckfileRouter.post("/download",authenticate,(req, res) => {
    if(process.env.NODE_ENV ==='production'){
        res.sendFile(req.body.filePath);
    }else{
        const filePath = path.join(__dirname,`../${req.body.filePath}`);
        // Stream the file to the client
        res.sendFile(filePath);
    }
});
module.exports = CheckfileRouter