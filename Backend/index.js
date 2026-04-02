import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"   // ✅ ADD THIS
import { connectDB } from "./src/config/db.js"
import authRoutes from "./src/routers/authRoutes.js"
import categoryRoutes from "./src/routers/categoryRoutes.js"
import connectCloudinary from "./src/config/cloudinary.js";
import cartRoute from "./src/routers/cartRoute.js"
import addMenuRoutes from "./src/routers/addMenu.js"
import { Order } from "./src/models/orderModel.js"

import orderRoutes from "./src/routers/orderRoutes.js"
import bookingRoutes from "./src/routers/bookingRoutes.js"
dotenv.config()
const app = express()
connectDB()
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.get("/", (req , res)=>{
    res.send("Hello from Server")
})
app.use("/api/auth" , authRoutes)
app.use("/api/category" , categoryRoutes)
app.use("/api/menu" , addMenuRoutes)
app.use("/api/cart" , cartRoute)
app.use("/api/order" , orderRoutes)
app.use("/api/booking", bookingRoutes)
connectCloudinary();
app.listen(PORT , ()=>{
    console.log(`Server running on Port ${PORT}`)
})