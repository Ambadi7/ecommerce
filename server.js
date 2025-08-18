import config from "./src/config/config.js"
import app from "./src/app.js"
import colors from 'colors'
import mongoose from "mongoose"
import Razorpay from "razorpay"



(
    async (req,res ) => {
        try{
            await mongoose.connect(config.MONGODB_URL)
            console.log("Successfully connected to mongoDB".bgBlack.blue)
        }catch(error){
            console.log(`Error in DB ${error}`.bgRed.white)
            res.status(500).json({
            success:false,
            message : "Error in DB",
            error,
        })
        }
    }
)()

export const instance = new Razorpay({
    key_id : config.RAZORPAY_API_KEY,
    key_secret : config.RAZORPAY_API_SECRET
})

const PORT = config.PORT
app.listen(PORT , ()=>{
    console.log(`App is running at PORT :${PORT} successfully`.rainbow)
})
