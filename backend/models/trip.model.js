const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  status: {
    type: String,
    enum: ["planning", "completed", "ended", "ongoing"],
    default: "planning",
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
  trip_days: {
    type: Number,
    default: 0,
  },
  trip_created_at: {
    type: Date,
    default: Date.now,
  },
  trip_updated_at: {
    type: Date,
    default: Date.now,
  },
  trip_plan: {
    type: Object,
    default: {},
  },
});

const badRequest = (message) => {
  const error = new Error(message);
  error.status = 400;
  return error;
};

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Trip Methods
TripSchema.pre("save", async function (next) {
  const trip = this;
  // check start_date < end_date
  if (trip.trip_start_date > trip.trip_end_date) {
    return next(badRequest("Start date must be before end date"));
  }
  // only new trips must start in the future, so trips can still be
  // edited once they are underway
  if (trip.isNew && trip.trip_start_date < startOfToday()) {
    return next(badRequest("Start date must not be in the past"));
  }
  trip.trip_updated_at = Date.now();
  next();
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
