import mongoose from "mongoose";

export const connectDB = async(req ,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected");
        
    } catch (error) {
        console.log(`Error in connecting Database ${error}` )
    }
}