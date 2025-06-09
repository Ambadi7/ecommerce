import JWT from "jsonwebtoken"
import config from "../config/config.js"
import User from "../models/userSchema.js"
import authRoles from "../utils/authRoles.js"



//checking is logges in 
export const isLoggedIn =(req,res,next) =>{
    try{
     const decode = JWT.verify(req.headers.authorization,config.JWT_SECRET) 
     req.user = decode
     next()
    }catch(error){
     console.log(`error in isloggedin middleware `,error)
    }
 }

//checking is admin
export const isAdmin = async(req,res,next) => {
   
    try{
        
        const user = await User.findOne(req.user._id );
        
        if (user.role !== authRoles.ADMIN){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this resource"
            })
        }
        else{
            next()
        }
    }catch(error){
        console.log(`error from middlware`,error)
    }
}

// export const isAdmin =async(req,res,next)=>{
//     try{
//         const user = await User.findById(req.user._id)
//         if(user.role !== authRoles.ADMIN){
//             return res.status(401).json({
//                 success : false ,
//                 message : "unauthorized user "
//             })
//         }else{
//             next()
//         }

//     }catch(error){
//         console.log(`error from middileware`,error)
//     }

// }