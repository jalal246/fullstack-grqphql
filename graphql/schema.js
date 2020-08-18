const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {}
  type Mutation {}
`;

module.exports = typeDefs;
