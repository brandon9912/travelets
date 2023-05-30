const express = require("express");
const router = express.Router();

const {
  getPlacesbyKeyword,
  createTrip,
  getTrip,
} = require("../controllers/trip.controller");

router.get("/trip/google-map-places", getPlacesbyKeyword);
router.post("/trip", createTrip);
router.get("/trip", getTrip);

module.exports = router;
