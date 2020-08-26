const { DataSource } = require("apollo-datasource");

class BookingAPI extends DataSource {
  constructor(Booking, event) {
    super();
    this.Booking = Booking;
  }

  bookEvent({ eventID }) {}

  cancelBooking({ bookingID }) {}
}

module.exports = BookingAPI;
