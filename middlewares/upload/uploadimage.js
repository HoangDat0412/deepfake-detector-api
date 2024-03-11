const multer  = require('multer');
const { mkdirp } = require("mkdirp");
const uploadFile = (type) =>{

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(process.env.NODE_ENV === 'production'){
                mkdirp.sync(`/usr/src/app/public/user/${req.user.id}/${type}`)
            }else{
                mkdirp.sync(`public/user/${req.user.id}/${type}`)
            }
            cb(null, process.env.NODE_ENV === 'production' ? `/usr/src/app/public/user/${req.user.id}/${type}` : `public/user/${req.user.id}/${type}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null,uniqueSuffix  + '-' + file.originalname)
        }
    })
    const upload = multer({ storage: storage,fileFilter : function (req,file,cb){
        let extensionImgList;
        if(type ==="image"){
            extensionImgList = [".jpg",".png"];
        }
        if(type === "void"){
            extensionImgList = [".mp3"]
        }
        if(type === "video"){
            extensionImgList = [".mp4"]
        }
        const extension = file.originalname.slice(-4);
        const check = extensionImgList.includes(extension);
        if(check){
            cb(null,true)
        }else{
            cb(new Error("Đuôi file không hợp lệ"))
        }
    } })
    return upload.single(type)
}

module.exports = {
    uploadFile}