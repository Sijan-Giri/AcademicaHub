import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination : function(req:Request,file:Express.Multer.File,cb:any) {
        const allowedFileTypes = ['image/png','image/jpg','image/jpeg'];
        if(!allowedFileTypes.includes(file.mimetype)) {
            return console.log("This file type is not allowed !!")
        }
        cb(null,"./src/uploads")
    },
    filename : function(req:Request,file:Express.Multer.File,cb:any) {
        cb(null ,Date.now() + '-' + file.originalname )
    }
})

export {storage , multer}