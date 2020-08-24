const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const EventAPI = require("./datasources/event");
const UserAPI = require("./datasources/user");

const Event = require("../db/event");
const User = require("../db/user");

const eventAPI = new EventAPI(Event);
const userAPI = new UserAPI(User);

// set up any dataSources our resolvers need
const dataSources = () => ({
  eventAPI,
  userAPI,
});

// the function that sets up the global context for each resolver, using the req
// eslint-disable-next-line no-unused-vars
const context = async ({ req }) => {
  // simple auth check on every request
  // const auth = (req.headers && req.headers.authorization) || "";
  // const email = new Buffer(auth, "base64").toString("ascii");

  // // if the email isn't formatted validly, return null for user
  // if (!isEmail.validate(email)) return { user: null };
  // // find a user by their email
  // const users = await store.users.findOrCreate({ where: { email } });
  // const user = users && users[0] ? users[0] : null;

  return {};
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  playground: true,
});

module.exports = apolloServer;
