var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var subzedditsRouter = require("./routes/subzeddits");
var postsRouter = require("./routes/posts");
var commentsRouter = require("./routes/comments");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);  don't need rendering routes
// app.use('/users', usersRouter);
app.use("/api/users", usersRouter);
app.use("/api/sz", subzedditsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
/*
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
*/

module.exports = app;
