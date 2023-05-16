const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).json({
    status: "ok",
    message: "Welcome to the backend of the MERN Stack App: travelets",
  });
});

router.get("/healthcheck", function (req, res, next) {
  res.status(200).json({
    status: "ok",
    message: new Date(Date.now()).toUTCString(),
  });
});

module.exports = router;
