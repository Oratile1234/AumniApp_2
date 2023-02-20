const multer = require("multer");
const path = require("path");

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (request, file, cb ) => {
        let ext = path.extname(file.originalname);
        // console.log(file)
        // console.log(ext)
        //test our file uploads if they meet the criteria/ test condition set below
        if(ext !== ".jpeg" &&  ext !== ".jpg" && ext !== ".png" && ext !== ".pdf"){
            cb("message: Unsupported file format")
            return 
        }
        cb(null, true);
    },
});  