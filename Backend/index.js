import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"   // ✅ ADD THIS
import { connectDB } from "./src/config/db.js"
dotenv.config()

const app = express()
connectDB()
// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.get("/", (req , res)=>{
    res.send("Hello from Server")
})

app.listen(PORT , ()=>{
    console.log(`Server running on Port ${PORT}`)
})