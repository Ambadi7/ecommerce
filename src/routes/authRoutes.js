import express from 'express'
import { signUp,login,logOut } from '../controllers/authControllers.js'
import { isAdmin, isLoggedIn } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logOut)
router.get("/user-auth",isLoggedIn,(req,res)=>{
    res.status(200).json({
        ok : true
    })
})

router.get("/admin-auth",isLoggedIn,isAdmin,(req,res)=>{
    res.status(200).json({
        ok : true
    })
})

export default router
