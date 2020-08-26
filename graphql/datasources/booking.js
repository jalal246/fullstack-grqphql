const { DataSource } = require("apollo-datasource");

class BookingAPI extends DataSource {
  constructor(BookingModel, event) {
    super();
    this.Booking = BookingModel;
  }

  bookEvent({ eventID }) {}

  cancelBooking({ bookingID }) {}
}

module.exports = BookingAPI;
