// External Dependencies
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const createError = require("http-errors");
const mongoose = require("mongoose");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
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

// Setting up LowDB
const adapter = new FileSync("data/db.json");
const db = low(adapter);
db.defaults({ records: [] }).write();

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

// ERROR HANDLING
// app.use((req, res, next) => {
// 	const error = new Error("Where do you think you're going??");
// 	error.status = 404;
// 	next(error);
// });

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
