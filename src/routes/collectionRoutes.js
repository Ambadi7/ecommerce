import express from 'express'
import { createCollection, deleteCollection, getAllCollection, getSingleCollection, updateCollection, } from '../controllers/collectionControllers.js'
import { isAdmin, isLoggedIn } from '../middlewares/authMiddlewares.js'

const router = express.Router()

//route for create collection
router.post("/create-collection",isLoggedIn,isAdmin,createCollection)
router.get("/get-allcollection",getAllCollection)
router.put("/update-collection/:id",updateCollection)
router.delete("/delete-collection/:id",deleteCollection)
router.get("/single-collection/:slug",getSingleCollection)

export default router