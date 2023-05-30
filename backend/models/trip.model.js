const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.model");

// Trip Schema
const TripSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trip_name: {
    type: String,
    required: true,
  },
  trip_start_date: {
    type: Date,
    required: true,
  },
  trip_end_date: {
    type: Date,
    required: true,
  },
  trip_location: {
    type: String,
    required: true,
  },
  daily_budget: {
    type: Number,
    default: 6000,
  },
  trip_created_at: {
    type: Date,
    default: Date.now,
  },
  trip_updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Trip Methods
TripSchema.pre("save", async function (next) {
  const trip = this;
  // check start_date < end_date
  if (trip.trip_start_date > trip.trip_end_date) {
    return next(new Error("Start date must be before end date"));
  }
  // check start_date > current_date
  if (trip.trip_start_date < Date.now()) {
    return next(new Error("Start date must be after current date"));
  }
  // check if trip_name already exists
  trip.trip_updated_at = Date.now();
  next();
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
