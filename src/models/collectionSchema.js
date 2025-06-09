import mongoose from "mongoose";

const collctionSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, "name is required"],
        trim : true,
        unique : true 
    },
    slug:{
        type: String,
        lowercase : true
    }
},{
    timestamps : true
})

export default mongoose.model("Collection",collctionSchema)