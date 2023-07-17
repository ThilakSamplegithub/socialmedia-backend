const mongoose=require("mongoose")
const postsSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"socialMediausers"}
},{versionKey:false})

const postsModel=mongoose.model("postssocialmedia",postsSchema)
module.exports={postsModel}