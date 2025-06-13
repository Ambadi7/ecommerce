import formidable from "express-formidable";
import express from 'express'
import { createProduct, getAllProducts } from "../controllers/productControllers.js";

const router = express.Router()

router.post("/create-product", formidable(),createProduct)
router.get("/get-allproducts",getAllProducts)

export default router