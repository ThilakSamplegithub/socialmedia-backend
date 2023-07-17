const mongoose=require("mongoose")
const usersSchema=new mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String
},{versionKey:false})
const userModel=mongoose.model("socialMediausers",usersSchema)
module.exports={userModel}