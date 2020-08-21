const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    event(id: ID!): Event
    events: [Event]!
    user: User
  }

  type Mutation {
    createEvent(eventInput: EventInput!): Event
    login(email: String!): String
  }

  input EventInput {
    name: String!
    desc: String
    price: Float
  }

  type Event {
    id: ID!
    name: String
    desc: String!
    price: Float!
    date: String
  }

  type User {
    id: ID!
    email: String!
  }
`;

module.exports = typeDefs;
