import express from "express" 
import { adminOnly , protect } from "../middlewares/authMiddleware.js"
import { getAllOrders, placeOrder, updateOrderStatus } from "../controllers/orderController.js"

const orderRoutes = express.Router()
orderRoutes.post("/placeOrder" , protect , placeOrder)
orderRoutes.post("/orderOrder" , adminOnly , getAllOrders)
orderRoutes.put("/update-status/:orderId" , adminOnly , updateOrderStatus)

export default orderRoutes;