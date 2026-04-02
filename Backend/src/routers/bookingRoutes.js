import express from "express"
import { adminOnly , protect } from "../middlewares/authMiddleware.js"
import { createBooking, getAllBookings, getUserBookings, updateBookingStatus } from "../controllers/bookingController.js"

const bookingRoutes = express.Router()
bookingRoutes.post("/createBooking" , protect , createBooking)
bookingRoutes.get("/my-booking" , protect , getUserBookings)
bookingRoutes.get("/allBooking" , adminOnly , getAllBookings)
bookingRoutes.put("/update-booking" , adminOnly , updateBookingStatus)

export default bookingRoutes;