import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import { envConfig } from "../config/config";

cloudinary.config({ 
    cloud_name: envConfig.cloudinaryName as string,
    api_key: envConfig.cloudinaryApiKey as string,
    api_secret: envConfig.cloudinaryApiSecret as string
});

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : async(req,file) => {
        folder : "academicahub"
    }
})

export default {cloudinary,storage}