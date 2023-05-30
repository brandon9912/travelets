const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./utils/db");
db.connect();

const indexRouter = require("./routes");
const userRouter = require("./routes/user.routes");
const tripRouter = require("./routes/trip.routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", indexRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", tripRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    status: "false",
    message: "Page Not Found",
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ status: "error", message: err.message });
});

module.exports = app;
