const axios = require("axios");
const jwt = require("jsonwebtoken");
const Trip = require("../models/trip.model");

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
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user_id = decoded.userId;
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
        user_id: user_id,
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
      res.status(500).json({ message: error.message });
    }
  },
  getTripbyUserId: async (req, res) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user_id = decoded.userId;

      const trip = await Trip.find({ user_id: user_id });
      // console.log(trip);
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
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user_id = decoded.userId;

      const { trip_id } = req.params;
      const {
        trip_name,
        trip_location,
        trip_start_date,
        trip_end_date,
        daily_budget,
        trip_plan,
      } = req.body;

      const trip = await Trip.findById(trip_id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      trip.trip_name = trip_name;
      trip.trip_location = trip_location;
      trip.trip_start_date = trip_start_date;
      trip.trip_end_date = trip_end_date;
      trip.daily_budget = daily_budget;
      trip.trip_plan = trip_plan;

      const updatedTrip = await trip.save();
      res.status(200).json({
        message: "Update Trip successfully",
        data: updatedTrip,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  getTripbyId: async (req, res) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user_id = decoded.userId;

      const { trip_id } = req.params;
      const trip = await Trip.findById({ _id: trip_id });
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      if (trip.user_id != user_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
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
