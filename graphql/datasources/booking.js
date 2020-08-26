/* eslint-disable no-underscore-dangle */
const { DataSource } = require("apollo-datasource");

class BookingAPI extends DataSource {
  constructor(BookingModel, userAPI, eventAPI) {
    super();
    this.Booking = BookingModel;

    this.eventAPI = eventAPI;
    this.userAPI = userAPI;
  }

  async getAllBookings() {
    const bookings = await this.Booking.find().populate("user");

    return bookings.map((event) => ({
      ...event._doc,
    }));
  }

  async bookEvent({ eventID, userID }) {
    const newBooking = new this.Booking({ event: eventID, user: userID });

    const res = await newBooking.save();

    const {
      _doc: { createdAt, updatedAt, ...rest },
    } = res;

    return {
      createdAt: new Date(createdAt).toISOString(),
      updatedAt: new Date(updatedAt).toISOString(),
      ...rest,
    };
  }

  async getBookingByID({ _id }) {
    const booking = await this.Booking.findOne({ _id });

    if (booking) {
      const {
        _doc: { createdAt: cDT, updatedAt: uDT, event: eventID, user: userID },
      } = booking;

      const event = await this.eventAPI.getEventById({ _id: eventID });
      const user = await this.userAPI.getUserID({ _id: userID });

      const createdAt = new Date(cDT).toISOString();
      const updatedAt = new Date(uDT).toISOString();

      return {
        event,
        user,
        createdAt,
        updatedAt,
      };
    }

    throw new Error("Booking not found!");
  }

  cancelBooking({ bookingID }) {}
}

module.exports = BookingAPI;
