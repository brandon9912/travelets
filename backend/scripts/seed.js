// Creates a demo account with one sample trip so visitors can try the app
// without signing up. Safe to run repeatedly: it replaces the demo data.
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Trip = require("../models/trip.model");

const DEMO_EMAIL = process.env.DEMO_EMAIL || "demo@travelets.app";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "travelets-demo";

const daysFromNow = (days) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
};

async function seed() {
  await mongoose.connect(process.env.DATABASE_URL);

  const existing = await User.findOne({ email: DEMO_EMAIL });
  if (existing) {
    await Trip.deleteMany({ user_id: existing._id });
    await existing.deleteOne();
  }

  const user = await new User({
    username: "Demo Traveler",
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  }).save();

  await new Trip({
    user_id: user._id,
    trip_name: "Weekend in Taipei",
    trip_location: "Taipei",
    trip_start_date: daysFromNow(14),
    trip_end_date: daysFromNow(16),
    daily_budget: 3000,
  }).save();

  console.log(`Demo account ready: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
