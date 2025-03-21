import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    avatar:{
        type:String, //store to cloudanary
        required:true,
        lowercase:true,
        trim:true
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }

    ],password :{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String,

    }
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign({
        _id : this._id,
        username : this.username,
        fullName:this.fullName,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY  
    }
)
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User",UserSchema);