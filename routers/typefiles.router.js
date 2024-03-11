const express = require("express");
const { createTypeFile,deleteTypeFile,updateTypeFile,getAllTypeFile } = require("../controllers/typefiles.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const TypeFilesRouter = express.Router()

TypeFilesRouter.post('/',authenticate,auAdmin(["ADMIN"]),createTypeFile)
TypeFilesRouter.delete('/:id',authenticate,auAdmin(["ADMIN"]),deleteTypeFile)
TypeFilesRouter.patch('/:id',updateTypeFile)
TypeFilesRouter.get('/',getAllTypeFile)
module.exports = TypeFilesRouter