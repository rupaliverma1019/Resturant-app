import express from "express"
import {protect , adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js"

const cartRoute = express.Router()
cartRoute.post("addcart" , protect , addToCart )
cartRoute.get("get" , protect , getCart)
cartRoute.delete ("remove" , protect , removeFromCart)


export default cartRoute