import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
   const  {email,fullName,username,password} = req.body ;

if([email,fullName,username,password].some((field)=>field === "")){
    throw new ApiError(400,"All fields are required");
}

const existUser =await User.findOne({
    $or : [{ email },{ username }]
})

if(existUser){
    throw new ApiError(409,"User with this Username or email already registered")
}

const avatarLocalPath = req.files?.avatar?.[0]?.path;
//const coverImageLocalPath = req.files?.coverImage?.[0].path;

let coverImageLocalPath;
if (req.files && Array.isArray(req.files?.coverImage?.[0]?.path) && req.files?.coverImage?.length > 0 ) {
    coverImageLocalPath = req.files?.coverImage?.[0]?.path;
}



if(!avatarLocalPath){
    throw new ApiError(400,"Avatar field is required");
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
    throw new ApiError(400,"Avatar field is required");
}

const user = await User.create({
    username:username.toLowerCase(),
    email,
    fullName,
    avatar: avatar.url,
    coverImage:coverImage?.url || "",
    password,
})

const createdUser = await User.findById(user.id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered Successfully")
);


})

export {registerUser}