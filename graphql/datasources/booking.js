/* eslint-disable no-underscore-dangle */
const { DataSource } = require("apollo-datasource");

class BookingAPI extends DataSource {
  constructor(BookingModel) {
    super();
    this.Booking = BookingModel;
  }

  async getAllBookings() {
    const bookings = await this.Booking.find().populate("user");

    return bookings.map((event) => ({
      ...event._doc,
    }));
  }

  async bookEvent({ eventID, userID }) {
    const newBooking = new this.Booking({ event: eventID, user: userID });

    await newBooking.save();

    return { ...newBooking._doc };
  }

  cancelBooking({ bookingID }) {}
}

module.exports = BookingAPI;
