const {userModel}=require("../models/users.models")
const {Router}=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=Router()
userRouter.post('/register',async(req,res)=>{
    const {email,password,name,gender}=req.body
   try{
    const hashedPassword=await bcrypt.hash(password,5)
    if(hashedPassword){
    await userModel.create({email,password:hashedPassword,name,gender})
   const usersData=await userModel.find()
   console.log(usersData)
   return res.json(usersData)
    }else{
        res.send("Not  hashed password")
    }
   }catch(err){
console.log(err.message)
res.status(500).send("Not registered")
   }
})
userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
    const user=await userModel.find({email})
    if(email){
      const decoded=bcrypt.compare(password,user[0].password)
      if(decoded){
        console.log(decoded)
      const token= jwt.sign({userId:user[0]._id},"masaikey")
      res.send({user,token})
      }else{
        res.send("you are not authorized")
      }
    }else{
        res.send("There is no such email")
    }
    }catch(err){
        console.log(err.message)
        res.send(err.message)
    }
})
module.exports={userRouter}
