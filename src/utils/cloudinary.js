import { v2 as cloudanary } from "cloudinary";
import fs from "fs";

cloudanary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
   const response =    await  cloudanary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("File is uploaded on the  cloudinary");
        console.log("response",response.url)
        return response;
    } catch (error) {
        //remove the locally save temporary file due to upload operation failed
        fs.unlinkSync(localFilePath);
        return null
    }
}

export {uploadOnCloudinary}