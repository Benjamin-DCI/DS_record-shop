// External Dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const mongoose = require("mongoose");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const ordersRouter = require("./routes/orders");
const { setCors } = require("./middleware/setCors");

// Initialise
const app = express();

// Logging
app.use(logger("dev"));

// CONNECT TO DB

mongoose.connect("mongodb://localhost:27017/record-shop", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", () => {
  console.log("Database connection established...");
});

// Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);

// ERROR HANDLING
app.use((req, res, next) => {
  return next(createError(400, "Looks like you are lost"));
  next();
});

app.use((err, req, res, next) => {
  res.send({
    error: {
      message: err.message
    }
  });
});

// Path
module.exports = app;
