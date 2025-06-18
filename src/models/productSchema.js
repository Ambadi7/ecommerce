import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Name is required"],
        trim : true,
        maxlength :[50,"Name should not exceed 50 chars"]
    },
    slug:{
        type : String,
        lowercase : true
    },
    description :{
        type : String,
        required : [true,"Product description is required"],
        trim : true,
        maxlength:[100,"description should not exceed 100 char"]
    },
    price :{
        type : Number,
        required : true
    },
    collection :{
        type : mongoose.ObjectId,
        ref : "Collection",
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    photo :{
        data : Buffer,
        contentType : String
    },
    shipping : {
        type : Boolean
    }

},{
    timestamps : true
})

export default mongoose.model("Product",productSchema)