const Query = {
  events: (_, __, { dataSources }) => dataSources.eventAPI.getAllEvents(),
  event: (_, { id }, { dataSources }) =>
    dataSources.eventAPI.getEventById({ id }),
  getBookingByID: async (_, args, { dataSources }) => {
    return dataSources.bookingAPI.getBookingByID(args);
  },
  getAllBookings: async (_, __, { dataSources }) => {
    return dataSources.bookingAPI.getAllBookings();
  },
  login: async (_, args, { dataSources }) => {
    return dataSources.userAPI.login(args);
  },
};

const Mutation = {
  createEvent: async (_, { eventInput }, { dataSources }) => {
    return dataSources.eventAPI.createEvent(eventInput);
  },
  createUser: async (_, { userInput }, { dataSources }) => {
    return dataSources.userAPI.createUser(userInput);
  },
  addEventByUserID: async (_, { userEventInput }, { dataSources }) => {
    return dataSources.userAPI.addEventByUserID(userEventInput);
  },
  bookEvent: async (_, args, { dataSources }) => {
    return dataSources.bookingAPI.bookEvent(args);
  },
  cancelBooking: async (_, args, { dataSources }) => {
    return dataSources.bookingAPI.cancelBooking(args);
  },
};

module.exports = { Query, Mutation };
