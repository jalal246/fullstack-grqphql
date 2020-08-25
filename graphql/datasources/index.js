const EventAPI = require("./event");
const UserAPI = require("./user");

const Event = require("../../db/event");
const User = require("../../db/user");

const userAPI = new UserAPI(User);
const eventAPI = new EventAPI(Event, userAPI);

// set up any dataSources our resolvers need
const dataSources = () => ({
  eventAPI,
  userAPI,
});

module.exports = dataSources;
