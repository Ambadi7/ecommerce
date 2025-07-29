import fs from "fs"
import Product from "../models/productSchema.js"
import Collection from "../models/collectionSchema.js"
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

//get single product controller

export const getSingleProduct = async (req,res) =>{
    try{
        //destructuring another method
        const product = await Product.findOne({slug :req.params.slug}).select("-photo").populate("collection")

        res.status(200).json({
            success : true,
            message : `Successfully fetch the single collection`,
            product
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false ,
            message : `Error in fetching single product ${error}`,
            error
        })
    }
}

//fetch photo
export const productPhoto = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.pid).select("photo")

        if(product.photo.data){
            res.set("Content-type",product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in fetching photo ${error}`,
            error
        })
    }
}

//product delete

export const deleteProduct = async (req,res) => {
    try{

        const alreadyDeleteProduct = await Product.findById(req.params.pid).select("-photo")

        if(!alreadyDeleteProduct){
            return res.status(200).json({
                success : false,
                message : "NO product found"
            })
        }

        await Product.findByIdAndDelete(req.params.pid).select("-photo")


        res.status(200).json({
            success : true,
            message : "Product has been deleted successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message :`Error in delete product ${error}`,
            error
        })
    }
}

//product update

export const updateProduct = async (req,res) =>{
    try{
        const {name , description , price , collection , quantity , shipping} = req.fields
        const { photo } = req.files

        //fields validation
        if(!name || !description || !price || !collection || !quantity || !shipping){
            return res.status(400).json({
                success : false ,
                message : "fIll all the fields"
            })
        }

        
        //photo validation
        if(!photo && photo.size>1000000){
            res.status(400).json({
                success : false,
                message : "photo is required and should be less than 1MB"
            })
        }

        //update
        const product = await Product.findByIdAndUpdate(
            req.params.pid,
            {...req.fields,slug:slugify(name)},
            {new:true}
        )

        //update photo
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(201).json({
            success : true,
            message : "Product updated Successfully",
            product
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false ,
            message :`Error in update product ${error}`,
            error
        })
    }
}

//filter component

export const filterProduct = async (req,res) => {
    try{
        const {checked,radio} = req.body 
        let args = { }

        //we will have collection in the args so fullfil its value with checked
        if(checked.length>0){
            args.collection = checked
        }

        //user can select only one radio so we can directly cheched value using mongodb therory

        if(radio.length) {
            args.price ={$gte : radio[0],$lte : radio[1]}
        }

        const products = await Product.find(args)
        res.status(200).json({
            success : true,
            message : 'filterd successfully',
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error while filtering products ${error}`,
            error
        })
    }
}

//total count products
//estimatedDocumentCount() quickly gives you an approximate number of documents in a MongoDB collection. It's fast but may not be exact. Use it when you need a quick count and perfect accuracy isn't required.
export const productCount = async (req,res) => {
    try{
        const totalProducts = await Product.find({}).estimatedDocumentCount();
        res.status(200).json({
            success : true,
            totalProducts
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in product count${error}`,
            error
        })
    }
}

//for pagination
//product list based on page

export const productList = async (req ,res) => {
    try{
        const perPage =3
        const page =req.params.page ? req.params.page : 1
        const products = await Product.find({})
            .select("-photo")
            .skip((page-1)*perPage)
            .limit(perPage)
            .sort({createdAt: -1})
        res.status(200).json({
            success :true,
            products
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in product list ${error}`,
            error
        })
    }
}

export const searchProduct = async(req,res) => {
    try{
        //grab the keyword from the url
        const {keyword} = req.params
        //find the keyword from the name or description of the product
        // if the keyword is present either in name or description we will display it
        //the "options" value "i" the case insenstive

        const results = await Product
            .find({
                $or : [
                    { name : { $regex : keyword , $options : "i"}},
                    {description : {$regex :keyword, $options : "i"}},
                ],
            })
            .select("-photo")
        res.json(results)

    }catch(error){
        console.log(error)
        res.status(400).json({
            success : false ,
            message : `Error in Search Product API ${error}`,
            error,
        })
    }
}

//products by collection
export const productsByCollection = async (req,res) => {
    try{
        const collection = await Collection.findOne({slug : req.params.slug})

        const products =  await Product.find({collection}).populate("collection")

        res.status(200).json({
            success : true,
            message : "Successfully fetched products by collection",
            collection,
            products
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false ,
            message : `Error in productsByCollecton ${error}`,
            error
        })
    }
}