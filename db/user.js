const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = {
  id: String,
  email: String,
  password: String,
  createdEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
};

const userSchema = new Schema(schema);

module.exports = model("User", userSchema);
