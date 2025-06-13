import fs from "fs"
import Product from "../models/productSchema.js"
import slugify from "slugify"

export const createProduct = async(req ,res) =>{
    try{
        //destructre the items
        const {name , description,price,collection,quantity,shipping } = req.fields 
        const {photo} = req.files

        //validation
        if(!name || !description || !price){
            return res.status(400).json({
                success : false,
                message : "please fill product name or description or price"
            })
        }

        //photo validation
        if(!photo && photo.size > 1000000){
            return res.status(400).json({
                success : false,
                message : "Photo is requird and should not exceed 1Mb"
            })
        }

        const product = new Product({...req.fields,slug:slugify(name)})
        // if there is photo , we will make some changes in the product we receive
        //sinc the date through fs module  and pass the path

                if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).json({
            success : true,
            message : "New Product has been Created Successfully",
            product,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in product creation ${error}`,
            error
        })
    }
}

//getallproducts
export const getAllProducts = async (req,res) =>{
    try{
        const products = await Product.find({}).select("-photo").limit(12).sort({createdAt :-1})


        res.status(200).json({
            success : true,
            message : "Successfully fetch all product",
            count : products.length,
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false ,
            message : `Error in get all products ${error}`,
            error
        })
    }
}