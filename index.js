'use strict';
var express = require('express');
var app = require('express.io')();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);
var config = require('./configs.js');
var User = require('./models/user.js');
var favicon = require('serve-favicon');
passport.use(new LocalStrategy(
  function (email, password, done) {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {

  User.findById(user._id).exec(function (err, u) {
    if (err)
      throw err;
    done(null, u);
  });
});
app.http().io();
var io = app.io;
var auth = require('./routes/auth.js');
// var api = require('./routes/api.js');
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secretKeyThing',
  store: new MongoStore({
    url: config.db
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);
//app.use('/user', user);
var ark = require('./routes/ark.js')(io);
setupUsers();

function setupUsers() {
  User.count(function (err, count) {
    if (count === 0) {
      var matt = new User({
        name: 'Matthew Ferderber',
        email: 'matthewferderber@gmail.com',
        password: 'testUser',
        group: 'admin'
      });
      var shep = new User({
        name: 'name',
        email: 'shep@gmail.com',
        password: 'testUser',
        group: 'admin'
      });
      matt.save(function (err) {
        if (err) {
          console.log(err);
          var errMsg = 'An Error occured while registering';
          if (err.code === 11000) {
            errMsg = 'A user with that email already exists';
          }
        } else {}
      });
      shep.save(function (err) {
        if (err) {
          console.log(err);
          var errMsg = 'An Error occured while registering';
          if (err.code === 11000) {
            errMsg = 'A user with that email already exists';
          }
        } else {}
      });
      console.log('added users');
    }
  });
}


app.listen(config.port, function () {
  console.log('listening');
});
