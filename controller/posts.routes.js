const {Router}=require("express")
const postRouter=Router()
const {postsModel}=require("../models/post.model.js")
postRouter.post("/add",async(req,res)=>{
  const {title,body,device}=req.body
try{
 await postsModel.create({title,body,device,user_id:req.userId})
   const post=await postsModel.find()
   console.log(post)
  return res.json(post)
}catch(err){
    console.log(err.message)
    res.status(404).json("you are not authorized")
}
})
postRouter.get("/",async(req,res)=>{
    const {device}=req.query
    const query={}
    if(device){
        query.device=device
    }
try{
   const posts= await postsModel.find(query)
  return res.json(posts)
}catch(err){
    console.log(err.message)
    res.send("you are not authorized")
}
})
postRouter.patch("/update/:id",async(req,res)=>{
  const {id}=req.params
  try{
  const posts=await postsModel.find({_id:id})
  console.log(posts)
  if(String(req.userId)===String(posts[0].user_id)){
    await postsModel.updateOne({_id:id},{$set:req.body})
  const updatedPost=await postsModel.find({_id:id})
  return res.json(updatedPost)  
  }else{
    res.send("you are not authorized")
  }
  }catch(err){
     console.log(err.message)
     res.send(err.message)
  }
})
postRouter.delete('/delete/:id',async(req,res)=>{
const {id}=req.params
try{
    const posts=await postsModel.find({_id:id})
    if(String(req.userId)===String(posts[0].user_id)){
        await postsModel.deleteOne({_id:id})
        const afterDeletedPost=await postsModel.find() 
      return  res.status(201).json(afterDeletedPost)
    }else{
        res.send(`wrong credentials`)
    }
}catch(err){
 res.send("you are not authorized")
}
})
module.exports={postRouter}