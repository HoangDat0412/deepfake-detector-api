const express = require("express");
const { createUser, getUser, login, deleteUser, updateUser, getUserInformation, getUserFromId, setAvatar,userUpdateInformation,searchUser } = require("../controllers/user.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const { auAdmin } = require("../middlewares/auth/auAdmin");
const {uploadImg } = require("../middlewares/upload/uploadImg")

const UserRouter = express.Router()
// register
UserRouter.post("/",createUser);
// login
UserRouter.post("/login",login)
// admin update user 
UserRouter.post("/update/:id",authenticate,auAdmin(["ADMIN"]),updateUser);
// user update information
UserRouter.post("/updateuser",authenticate,userUpdateInformation);
// admin get list user 
UserRouter.get("/",authenticate,auAdmin(["ADMIN"]),getUser);
// user get user information
UserRouter.get("/information",authenticate,getUserInformation);
// admin delete user 
UserRouter.delete("/:id",authenticate,auAdmin(["ADMIN"]),deleteUser);
// admin get user information 
UserRouter.get("/detail/:id",authenticate,auAdmin(["ADMIN"]),getUserFromId);
// user upload avatar 
UserRouter.post("/setavatar",authenticate,uploadImg("avatar"),setAvatar);
// admin search user with email
UserRouter.post("/search",authenticate,auAdmin(["ADMIN"]),searchUser);
module.exports = UserRouter