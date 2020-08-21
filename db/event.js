const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = {
  id: String,
  name: String,
  desc: String,
  price: Number,
  date: String,
};

const eventSchema = new Schema(schema);

module.exports = model("Event", eventSchema);
