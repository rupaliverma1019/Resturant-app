import express from "express" 
import { adminOnly , protect } from "../middlewares/authMiddleware.js"
import { getAllOrders, placeOrder, updateOrderStatus } from "../controllers/orderController.js"

const orderRoutes = express.Router()
orderRoutes.post("/place" , protect , placeOrder)
orderRoutes.post("/order" , adminOnly , getAllOrders)
orderRoutes.put("/update-status/:orderId" , adminOnly , updateOrderStatus)

export default orderRoutes;