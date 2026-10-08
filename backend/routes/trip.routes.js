const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const {
  getPlacesbyKeyword,
  createTrip,
  getTripbyUserId,
  updateTripbyId,
  getNearbyPlaces,
  getPlaceDetail,
  getTripbyId,
} = require("../controllers/trip.controller");

// Every trip route needs a signed-in user, including the Google Places
// proxies so the server's API key can't be used anonymously.
router.use("/trip", isAuth);

router.get("/trip/google-map-places", getPlacesbyKeyword);
router.get("/trip/nearby-places", getNearbyPlaces);
router.get("/trip/place-detail", getPlaceDetail);
router.post("/trip", createTrip);
router.get("/trip", getTripbyUserId);
router.get("/trip/:trip_id", getTripbyId);
router.put("/trip/:trip_id", updateTripbyId);

module.exports = router;
