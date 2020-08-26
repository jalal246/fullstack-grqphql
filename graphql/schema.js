const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    event(_id: ID!): Event
    events: [Event]!
    bookings: [Booking]!
    user: User
  }

  type Mutation {
    createEvent(eventInput: EventInput!): Event
    createUser(userInput: UserInput!): User
    addEventByUserID(userEventInput: UserEventInput!): User
    bookEvent(eventID: ID!): Booking!
    cancelBooking(bookingID: ID!): Event!
  }

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  input UserEventInput {
    userID: ID!
    event: EventInputRecord!
  }

  input EventInputRecord {
    _id: ID!
    name: String
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
    creator: User!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event]!
  }
`;

module.exports = typeDefs;
