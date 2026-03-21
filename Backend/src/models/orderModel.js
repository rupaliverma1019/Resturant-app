import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
    
        items: [
          {
            menuItem: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Menu",
              required: true,
            },
    
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],
        totalAmount:{
            type : Number,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        status : {
            type: String,
            enum: ["Pending" , "Preparing" , "Delivered"],
            default : "Pending",
        },
        paymentMethod: {
            type : String,
            default : "Cash on Delievery",
        },
      },

 {timestamps:true})

export  const Order = mongoose.model("Order" , orderSchema)