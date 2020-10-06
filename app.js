const express = require("express");
const morgan = require("morgan");
const path = require("path");

const usersAPIRouter = require("./routes/api/users");
const { environment } = require("./config");
const storiesAPIRouter = require("./routes/api/stories");

// const indexAPIRouter = require('./routes/api/index');

const app = express();

app.use(express.json());
app.set("view engine", "pug");

app.use("/api/users", usersAPIRouter);
app.use("/stories", storiesAPIRouter);

// app.use('/', indexAPIRouter);

app.use(express.static(path.join(__dirname, "public")));

/************************************************/

app.get("/", (req, res) => {
  res.render("index");
});

/************************************************/
// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// TODO Custom error handlers.


// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
    stack: err.stack,
  });
});

/************************************************/

// module.exports = app;
app.listen(8000, () => console.log(`Listening on port 8000...`));
