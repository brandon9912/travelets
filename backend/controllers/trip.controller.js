const axios = require("axios");
const mongoose = require("mongoose");
const Trip = require("../models/trip.model");

// Validation errors from the model are the client's fault, not the server's
const errorStatus = (error) =>
  error instanceof mongoose.Error.ValidationError ||
  error instanceof mongoose.Error.CastError ||
  error.status === 400
    ? 400
    : 500;

// Loads the trip in req.params and checks it belongs to the signed-in user.
// Sends the error response itself and returns null when it doesn't.
const findOwnTrip = async (req, res) => {
  const { trip_id } = req.params;
  if (!mongoose.isValidObjectId(trip_id)) {
    res.status(404).json({ message: "Trip not found" });
    return null;
  }
  const trip = await Trip.findById(trip_id);
  if (!trip) {
    res.status(404).json({ message: "Trip not found" });
    return null;
  }
  if (trip.user_id.toString() !== req.userId) {
    res.status(403).json({ message: "Forbidden" });
    return null;
  }
  return trip;
};

const tripController = {
  getPlacesbyKeyword: (req, res) => {
    const { keyword, radius } = req.query;

    const googleMapUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    axios
      .get(googleMapUrl, {
        params: {
          query: keyword,
          radius: radius,
          key: process.env.GOOGLE_API_KEY,
        },
      })
      .then((response) => {
        // console.log(response.data);
        res.status(200).json({
          message: "Get Google Map Places successfully",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  },
  getNearbyPlaces: (req, res) => {
    // location must be in lat,lng format
    const { keyword, radius, latitude, longitude } = req.query;
    axios
      .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        params: {
          location: latitude + "," + longitude,
          keyword: keyword,
          radius: radius,
          key: process.env.GOOGLE_API_KEY,
          type: "tourist_attraction",
        },
      })
      .then((response) => {
        res.status(200).json({
          message: "Get Google Map Places successfully",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  },
  getPlaceDetail: (req, res) => {
    const { place_id } = req.query;
    axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: place_id,
          key: process.env.GOOGLE_API_KEY,
        },
      })
      .then((response) => {
        res.status(200).json({
          message: "Get Google Map Places successfully",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  },
  createTrip: async (req, res) => {
    try {
      const {
        trip_name,
        trip_location,
        trip_start_date,
        trip_end_date,
        daily_budget,
      } = req.body;

      const trip = new Trip({
        trip_name: trip_name,
        trip_location: trip_location,
        trip_start_date: trip_start_date,
        trip_end_date: trip_end_date,
        user_id: req.userId,
        daily_budget: daily_budget,
      });

      const newTrip = await trip.save();
      res.status(200).json({
        message: "Create Trip successfully",
        data: newTrip,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(errorStatus(error)).json({ message: error.message });
    }
  },
  getTripbyUserId: async (req, res) => {
    try {
      const trip = await Trip.find({ user_id: req.userId });
      res.status(200).json({
        message: "Get Trip successfully",
        data: trip,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateTripbyId: async (req, res) => {
    try {
      const trip = await findOwnTrip(req, res);
      if (!trip) return;

      // only overwrite the fields the client actually sent
      const fields = [
        "trip_name",
        "trip_location",
        "trip_start_date",
        "trip_end_date",
        "daily_budget",
        "trip_plan",
      ];
      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          trip[field] = req.body[field];
        }
      });
      trip.markModified("trip_plan");

      const updatedTrip = await trip.save();
      res.status(200).json({
        message: "Update Trip successfully",
        data: updatedTrip,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(errorStatus(error)).json({ message: error.message });
    }
  },
  getTripbyId: async (req, res) => {
    try {
      const trip = await findOwnTrip(req, res);
      if (!trip) return;
      res.status(200).json({
        message: "Get Trip successfully",
        data: trip,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = tripController;
