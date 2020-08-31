/* eslint-disable no-underscore-dangle */
const { DataSource } = require("apollo-datasource");

class BookingAPI extends DataSource {
  constructor(BookingModel, userAPI, eventAPI) {
    super();
    this.Booking = BookingModel;

    this.eventAPI = eventAPI;
    this.userAPI = userAPI;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getAllBookings() {
    const bookings = await this.Booking.find();

    return bookings.map(async (booking) => {
      return this.getBookingByID(booking);
    });
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
        createdAt: cDT,
        updatedAt: uDT,
        event: eventID,
        user: userID,
      } = booking;

      const event = await this.eventAPI.getEventById({ _id: eventID });
      const user = await this.userAPI.getUserID({ _id: userID });

      const createdAt = cDT.toISOString();
      const updatedAt = uDT.toISOString();

      return {
        _id,
        event,
        user,
        createdAt,
        updatedAt,
      };
    }

    throw new Error("Booking not found!");
  }

  async cancelBooking({ bookingID }) {
    if (!this.context || !this.context.isAuth) {
      throw new Error("Unauthorized!");
    }

    const booking = await this.getBookingByID({ _id: bookingID });

    await this.Booking.deleteOne({ _id: bookingID });

    return booking.event;
  }
}

module.exports = BookingAPI;
