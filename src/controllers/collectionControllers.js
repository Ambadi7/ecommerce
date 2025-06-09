import slugify from "slugify";
import Collection from "../models/collectionSchema.js";

export const createCollection = async(req,res) => {
    try{
        //get info fromm frontend
        const {name } = req.body 

        //validation
        if(!name){
            return res.status(400).json({
                success : false,
                message : "Please provide collection name"
            })

           
        }
         // check the collection is exist
        const existingCollection = await Collection.findOne({name})
        // if the collection is already exist send a response
        if(existingCollection){
            return res.status(200).json({
                success : false,
                message : "Collection already exist"

            })
        }

        //if collection is not existing create collection
        const collection = await Collection.create({name,slug:slugify(name)})

        //send success message
        res.status(200).json({
            success : true ,
            message : `New collection has been created successfully`,
            collection
        })
            

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message :`Error in creating collection${error}`,
            error
        })
    }
}

//get all collection 

export const getAllCollection = async(req,res) =>{
    try{
        const collection = await Collection.find({})

        res.status(200).json({
            success : true,
            message : "Successfully fetched all collection",
            count : collection.length,
            collection
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `error in get collection ${error}`,
            error
        })

    }
}

// update collection
export const updateCollection = async(req,res) =>{
    try{
        const {name} = req.body

        const {id} = req.params 
        const collection = await Collection.findByIdAndUpdate(id , {name ,slug:slugify(name)}, {new : true})

        res.status(200).json({
            success : true,
            message : "Successfully update the collection",
            collection
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in update collection ${error}`,
            error
        })
    }
}

//delete collection
export const deleteCollection = async (req,res)=>{
    try{
        const {id} =req.params
        const delCollection = await Collection.findByIdAndDelete(id)
        res.status(200).json({
            success : true ,
            message : `Collection Successfully deleted`,
            delCollection
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false ,
            message : `Error in delete collection ${error}`,
            error
        })
    }
}

//get single collection
export const getSingleCollection = async (req,res) => {
    try{
        const collection = await Collection.findOne({
            slug:req.params.slug
        })

        res.status(200).json({
            success : true,
            message : `Successfully fetch single collection`,
            collection
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : `Error in single collection ${error}`,
            error
        })
    }
}
