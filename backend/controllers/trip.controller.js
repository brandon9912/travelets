const axios = require("axios");
const jwt = require("jsonwebtoken");
const Trip = require("../models/trip.model");

const tripController = {
  getPlacesbyKeyword: (req, res) => {
    const { keyword, radius } = req.query;

    const googleMapKey = process.env.GOOGLE_API_KEY;
    const googleMapUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&key=${googleMapKey}&radius=${radius}`;
    axios
      .get(googleMapUrl)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.results.length);
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
      const { trip_name, trip_location, trip_start_date, trip_end_date, daily_budget } =
        req.body;

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
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  getTrip: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user_id = decoded.userId;

      const trip = await Trip.find({ user_id: user_id });
      res.status(200).json({
        message: "Get Trip successfully",
        data: trip,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = tripController;
