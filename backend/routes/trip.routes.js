const express = require("express");
const router = express.Router();

const { getPlacesbyKeyword } = require("../controllers/trip.controller");

router.get("/trip/google-map-places", getPlacesbyKeyword);

module.exports = router;
