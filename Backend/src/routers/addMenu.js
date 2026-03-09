import express from "express"
import {protect , adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addMenu, deleteMenuItem, getAllMenuItems, updateMenuItems } from "../controllers/menuController.js"

const addMenuRoutes = express.Router()
addMenuRoutes.post("/addMenu" , adminOnly , upload.single("image") ,  addMenu )
addMenuRoutes.put("/update/:id" , adminOnly , upload.single("image") , updateMenuItems)
addMenuRoutes.delete("/delete/:id" , adminOnly , deleteMenuItem)
addMenuRoutes.get("/getAllMenuItems" , getAllMenuItems)

export default addMenuRoutes