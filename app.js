const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require('cookie-parser');
const expressBearerToken = require('express-bearer-token');

const { environment,  jwtConfig: {secret} } = require("./config");

const usersAPIRouter = require("./routes/api/users");
const storiesAPIRouter = require("./routes/api/stories");
const responsesAPIRouter = require("./routes/api/responses");
const followAPIRouter = require("./routes/api/follow");
const storyClapAPIRouter = require("./routes/api/storyClap");
const responseClapAPIRouter = require('./routes/api/responseClap');

const usersFERouter = require("./routes/fe-users");
const createStoriesFERouter = require('./routes/fe-createStories');
const indexFERouter = require("./routes/fe-index");
const storyFERouter = require('./routes/fe-story');
const { checkUser } = require('./config/auth');

const app = express();

app.use(cookieParser(secret));
app.use(expressBearerToken({cookie: {signed: true, secret, key: "auth-token"}}));
app.use(checkUser);

app.use(express.json());
app.set("view engine", "pug");

app.use("/api/users", usersAPIRouter);
app.use("/api/stories/:id(\\d+)/responses", responsesAPIRouter);
app.use("/api/stories", storiesAPIRouter);
app.use("/api/follow", followAPIRouter);
app.use("/api/stories/:id(\\d+)/clap", storyClapAPIRouter);
app.use("/api/responses/:id(\\d+)/clap", responseClapAPIRouter);

app.use("/stories", createStoriesFERouter);
app.use('/story', storyFERouter);
app.use("/users", usersFERouter);
app.use("/", indexFERouter);

app.use(express.static(path.join(__dirname, "public")));

/************************************************/

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

module.exports = app;
