import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath)return null;
        //upload the file on cloudinary

       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file uploaded successfully
        console.log("File is uploaded succesfully on cloudinary",response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)//this will remove the locally saved file as the oprn got failed
        return null;
    }
}

export {uploadCloudinary};