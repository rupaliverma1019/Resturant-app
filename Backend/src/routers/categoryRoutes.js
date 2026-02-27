import express from "express"
import {protect , adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addCategory , deleteCategory, getAllCategory, updateCategory } from "../controllers/categoryController.js"

const categoryRoutes = express.Router()
categoryRoutes.get("/allcategory" , getAllCategory)
categoryRoutes.post("/addcategory" , adminOnly , upload.single("image") , addCategory)
categoryRoutes.put("/updatecategory/:id" , adminOnly , upload.single("image"),updateCategory)
categoryRoutes.delete("/deletecategory/:id", adminOnly , deleteCategory)

export default categoryRoutes

