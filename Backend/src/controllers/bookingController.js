import Booking from "../models/bookingSchema.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, numberOfPeople, date, time, status } = req.body;

    if (!name || !phone || !numberOfPeople || !date || !time || !status) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // check for overlapping booking
    const existingBooking = await Booking.findOne({
      date: date,
      time: time,
      status: { $ne: "Cancelled" },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This time slot is already booked",
        success: false,
      });
    }

    const booking = await Booking.create({
      user: id,
      name,
      phone,
      numberOfPeople,
      date,
      time,
      status,
    });

    return res.status(201).json({
      message: "Table Booked Successfully",
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { id } = req.user;

    const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      message: "Booking status updated successfully",
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};