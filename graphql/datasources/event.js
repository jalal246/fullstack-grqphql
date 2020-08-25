/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

const { DataSource } = require("apollo-datasource");

class EventAPI extends DataSource {
  constructor(Event, userAPI) {
    super();
    this.Event = Event;
  }

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
    return this.Event.find()
      .then((events) => {
        return events.map((event) => ({
          ...event._doc,
        }));
      })
      .catch((err) => {
        throw err;
      });
  }

  getAllEvents() {
    return this.Event.find()
      .then((events) => {
        return events.map((event) => ({
          ...event._doc,
        }));
      })
      .catch((err) => {
        throw err;
      });
  }

  async createEvent({ name, desc, price }) {
    const newEvent = new this.Event({
      name,
      desc,
      price,
      creator: "5f44290347833d37c8786c19",
    });

    const res = await newEvent.save();

    const createdEvent = { ...res._doc };

    return createdEvent;
  }
}

module.exports = EventAPI;
