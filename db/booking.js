const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const schema = {
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
};

const bookingSchema = new Schema(schema, { timestamps: true });

module.exports = model("Booking", bookingSchema);
