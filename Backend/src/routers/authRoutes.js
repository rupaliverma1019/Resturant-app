
import express from "express"
import { adminLogin, getProfile, loginUser, logoutUser, registerUser } 
from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
const authRoutes  = express.Router()
authRoutes.post("/register" ,  registerUser)
authRoutes.post("/login" , loginUser)
authRoutes.post("/admin/login" , adminLogin)
authRoutes.delete("/logout" , logoutUser)
authRoutes.get("/profile" , protect , getProfile)

export default authRoutes;