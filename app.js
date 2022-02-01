var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var cookieSession = require('cookie-session');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var dbConnectionPool = mysql.createPool({ host: 'localhost', database: 'covid_tracker'});
app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//changed placement of middleware
app.use(session({
  secret: 'a string of your choice',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public/website')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  if(!req.session.isAuthenticated == true) {
    res.redirect('/');
  }
  next();
});

// app.use(function(req, res, next) {
//   if(req.session.isAuthenticated == true && req.session.individual == true) {
//     express.static(path.join(__dirname,'public/site_user'));
//   }
//   if(req.session.isAuthenticated == true && req.session.owner == true) {
//     express.static(path.join(__dirname,'public/site_owner'));
//   }
//   if(req.session.isAuthenticated == true && req.session.admin == true) {
//     express.static(path.join(__dirname,'public/site_owner'));
//   }

//   next();
// });

// app.use(function(req, res, next) {
//   if(req.session.isAuthenticated == true && req.session.owner == true) {
//     express.static(path.join(__dirname,'public/site_owner'));
//   }
//   next();
// });

// app.use(function(req, res, next) {
//   if(req.session.isAuthenticated == true && req.session.admin == true) {
//     express.static(path.join(__dirname,'public/site_owner'));
//   }
//   next();
// });



app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);










module.exports = app;
