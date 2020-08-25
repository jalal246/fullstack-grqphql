const Query = {
  events: (_, __, { dataSources }) => dataSources.eventAPI.getAllEvents(),
  event: (_, { id }, { dataSources }) =>
    dataSources.eventAPI.getEventById({ id }),
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
};

module.exports = { Query, Mutation };
