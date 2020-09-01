const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const dataSources = require("./datasources");

const context = async ({ req }) => {
  return {
    isAuth: req.isAuth,
  };
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
