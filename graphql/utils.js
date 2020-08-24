const Event = require("../db/event");
const User = require("../db/user");

function createStore() {
  return { Event, User };
}

module.exports = createStore;
