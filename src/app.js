import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import collectionRoutes from './routes/collectionRoutes.js'
import productRoutes from './routes/productRoutes.js'
import crypto from "crypto"

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(morgan())
app.use(express.json())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/collection",collectionRoutes)
app.use("/api/v1/product",productRoutes)

// const key = crypto.randomBytes(64).toString("hex")
// console.log(key)

app.get('/',(req,res)=>{
    res.send("<h1> Hello World</h1>")
})
export default app