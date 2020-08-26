const EventAPI = require("./event");
const UserAPI = require("./user");
const BookingAPI = require("./booking");

const EventModel = require("../../db/event");
const UserModel = require("../../db/user");
const BookingModel = require("../../db/booking");

const userAPI = new UserAPI(UserModel);
const eventAPI = new EventAPI(EventModel);

const bookingAPI = new BookingAPI(BookingModel, userAPI, eventAPI);

// set up any dataSources our resolvers need
const dataSources = () => ({
  eventAPI,
  userAPI,
  bookingAPI,
});

module.exports = dataSources;
