import mongoose, { Types } from "mongoose";

const menuModelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    isAvailable : {
        type:Boolean,
        default : true
    }

}, {timestamps:true})

export const Menu = mongoose.model("Menu" , menuModelSchema)