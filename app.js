// import the modules needed
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// get the modules need for routing
var index = require('./routes/index');
var users = require('./routes/users');

// start the express application
var app = express();

// setup default mongoose connection -- MUST BE AFTER you declare the Express application object --
var mongoDB = 'mongodb://tylerreed:password@ds239638.mlab.com:39638/node-twr';
mongoose.connect(mongoDB);

// get mongoose to use the global promise library
mongoose.Promise = global.Promise;

// get default connection
var db = mongoose.connection;

// bind connection to error eventg (to get notification of connection errors)
db.on('error', console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes the main url for each routing file
// the individual files will route urls beginning with their respective link
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
