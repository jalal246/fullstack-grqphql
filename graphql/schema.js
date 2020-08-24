const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    event(_id: ID!): Event
    events: [Event]!
    user: User
  }

  type Mutation {
    createEvent(eventInput: EventInput!): Event
    createUser(userInput: UserInput!): User
    login(email: String!): String
  }

  input EventInput {
    name: String!
    desc: String
    price: Float
  }

  type Event {
    _id: ID!
    name: String
    desc: String
    price: Float
    date: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    email: String!
    password: String
  }
`;

module.exports = typeDefs;
