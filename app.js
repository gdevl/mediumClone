const express = require('express');
const path = require('path');

const indexRouter = require('./routes/api/index');

const app = express();

app.use(express.json());
app.set('view engine', 'pug');
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

/************************************************/

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    next(err);
});


//TODO Custom error handlers.


// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});


/************************************************/
module.exports = app;