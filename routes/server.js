var router = require('express').Router();
//mongoose = require('mongoose'),
//db = mongoose.connection,
//User = require('../models/user.js'),
//config = require('../configs.js');

// function getDate() {
//   var now = new Date();
//   return now.toJSON();
// }

function isAuthenticated(req, res, next) {
  if (req.user)
    return next();
  res.send({
    isAuthenticated: false,
    redirectUrl: '/login'
  });
}
router.post('/getServerStatus', isAuthenticated, function (req, res) {
  console.log('getServerStatus: user: ' + req.user);
  return res.send('test');
});
router.post('/restartServer', isAuthenticated, function (req, res) {
  return res.send('test');
});
router.post('/updateServer', isAuthenticated, function (req, res) {
  return res.send('test');
});
router.post('/startServer', isAuthenticated, function (req, res) {
  return res.send('test');
});
router.post('/getConfig', isAuthenticated, function (req, res) {
  return res.send('test');
});
router.post('/setConfig', isAuthenticated, function (req, res) {
  return res.send('test');
});
router.post('/sendBroadcast', isAuthenticated, function (req, res) {
  return res.send('test');
});

module.exports = router;
