import formidable from "express-formidable";
import express from 'express'
import { createProduct, deleteProduct, filterProduct, getAllProducts, getSingleProduct, productCount, productList, productPhoto, updateProduct } from "../controllers/productControllers.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router()

router.post("/create-product", formidable(),createProduct)
router.get("/get-allproducts",getAllProducts)
router.get("/single-product/:slug",isLoggedIn,getSingleProduct)
router.get("/product-photo/:pid",productPhoto)
router.delete("/product-delete/:pid",isLoggedIn,deleteProduct)
router.put("/update-product/:pid",isLoggedIn,isAdmin,formidable(),updateProduct)
router.post("/product-filters",filterProduct)
router.get("/product-count",productCount)
router.get("/product-list/:page",productList)
export default router