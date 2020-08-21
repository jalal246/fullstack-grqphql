/* eslint-disable class-methods-use-this */

const { DataSource } = require("apollo-datasource");

class EventAPI extends DataSource {
  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  getEventById({ id }) {
    return {
      id,
      name: "not yet",
      desc: "this is great",
      price: "123.34",
      date: "100/1",
    };
  }

  getAllEvents() {
    return ["wow", "is this real", "fantastic"];
  }

  createEvent({ name, desc, price }) {
    return {
      id: "934809",
      name,
      desc,
      price,
      date: "100/1",
    };
  }
}

module.exports = EventAPI;
