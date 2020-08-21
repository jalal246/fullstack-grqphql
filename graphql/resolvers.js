const Query = {
  events: (_, __, { dataSources }) => dataSources.eventAPI.getAllEvents(),
  event: (_, { id }, { dataSources }) =>
    dataSources.eventAPI.getEventById({ id }),
  user: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
};

const Mutation = {
  createEvent: (_, { eventInput: { name, desc, price } }, { dataSources }) => {
    return dataSources.eventAPI.createEvent({ name, desc, price });
  },
  login: async (_, { email }, { dataSources }) => {
    const user = await dataSources.userAPI.findOrCreateUser({ email });
    if (user) return Buffer.from(email).toString("base64");
    return null;
  },
};

module.exports = { Query, Mutation };
