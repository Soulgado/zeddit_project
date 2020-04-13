var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pgp = require('pg-promise')();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let subzedditsRouter = require('./routes/subzeddits');

var app = express();

/*
PostgreDB
var db = pgp('postgres://postgres:admin@127.0.0.1:5432/postgres');
*/
// setup database connection - MongoDB

let mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);  don't need rendering routes
// app.use('/users', usersRouter);
app.use('/api/users', usersRouter);
app.use('/api/sz', subzedditsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
