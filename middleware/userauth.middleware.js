const jwt=require("jsonwebtoken")
const userauthMiddleware=(req,res,next)=>{
    const token=req.headers.authorization
  const decoded=jwt.verify(token,"masaikey")
  console.log(decoded)
  if(decoded){
    req.userId=decoded.userId
    console.log(req.userId,"is payload")
    next()
  }else{
    res.send("you are not authorized")
  }
}
module.exports={userauthMiddleware}