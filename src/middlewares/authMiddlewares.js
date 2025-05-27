import JWT from "jsonwebtoken"
import config from "../config/config.js"
import User from "../models/userSchema.js"
import authRoles from "../utils/authRoles.js"



//checking is logges in 
export const isLoggedIn =(req,res,next) =>{
    try{
     const decode = JWT.verify(req.headers.authorization,config.JWT_SECRET) 
     res.user = decode
     next()
    }catch(error){
     console.log(error)
    }
 }

//checking is admin
export const isAdmin =async(req,res,next)=>{
    try{
        const user = await User.findById(req.user._id)
        if(user.role !== authRoles.ADMIN){
            return res.status(401).json({
                success : false ,
                message : "unauthorized user "
            })
        }else{
            next()
        }

    }catch(error){
        console.log(error)
    }

}