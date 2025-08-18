import dotenv from 'dotenv'
dotenv.config()
const config= {
    PORT:process.env.PORT || 4000,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    RAZORPAY_API_KEY:process.env.RAZORPAY_API_KEY,
    RAZORPAY_API_SECRET:process.env.RAZORPAY_API_SECRET
}
export default config