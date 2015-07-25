var router = require('express').Router(),
  mongoose = require('mongoose'),
  //uuid = require('node-uuid'),
  config = require('../configs.js'),
  User = require('../models/user.js');

mongoose.connect(config.db);

// function isAuthenticated(req, res, next) {
//   if (req.user)
//     return next();
//   console.log('not auth');
//   res.send({
//     isAuthenticated: false,
//     redirectUrl: '/Login'
//   });
// }
router.post('/login', function (req, res) {
  var password = req.body.password;
  var email = req.body.email.toLowerCase();
  User.findOne({
    'email': email
  }, function (err, u) {
    if (err) {
      console.log(err);
      return res.send({
        isAuthenticated: false,
        message: 'An error occurred'
      });
    }
    if (u !== null)
      u.comparePassword(password, function (err, isMatch) {
        if (err) {
          console.log(err);
        }
        if (!isMatch) {
          console.log('password problem');
          return res.send({
            isAuthenticated: false,
            message: 'The login details were incorrect'
          });
        } else {
          req.login(u, function (err) {
            if (err) {
              console.log(err);
            }
            if (u.isVerified) {
              return res.send({
                isAuthenticated: true
              });
            }
            return res.send({
              isAuthenticated: true
            });
          });
        }
      });
    else {
      console.log('not auth');
      return res.send({
        isAuthenticated: false,
        message: 'The login details were incorrect'
      });
    }
  });
});
router.post('/logout', function (req, res) {
  console.log(req.user.email + ' Logged out');
  req.logout();
  res.send({
    isAuthenticated: false
  });
});
module.exports = router;
