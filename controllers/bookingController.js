import Booking from "../models/Booking";

// function to check availability of car for a given Date

const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookingss = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    pickupDate: { $gte: pickupnDate },
  });
  return bookings.length === 0
};


