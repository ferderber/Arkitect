module.exports = function (io) {
  var Rcon = require('simple-rcon');
  var fs = require('fs');
  var config = require('../configs.js');

  var conn = new Rcon(
    config.arkAddress,
    config.arkPort,
    config.arkPassword);
  conn.on('authenticated', function () {
    updateLoop();
    console.log('Authenticated');
  });
  conn.on('error', function (e) {
    console.log('error: ' + e);
  });
  conn.on('disconnected', function (e) {
    console.log('disconnected: ' + e);
  });
  conn.on('error', function (e) {
    console.log('error: ' + e);
  });
  io.route('ready', function (req) {
    console.log('send');
    conn.exec('getchat', function (chat) {
      // conn.exec('serverchat testtest', function (chat) {
      // console.log(chat);
      conn.exec('listplayers', function (players) {
        io.broadcast('players', players.body);
        console.log(players);
      });
      // });
    });
    sendArkConfig(req.io);
  });
  fs.watchFile(config.arkConfig, function (curr, prev) {
    console.log('change');
  });
  io.route('saveConfig', function (req) {
    saveArkConfig(req.data);
    updateClientConfig(req, req.data);
  });

  function updateLoop() {
    setInterval(updateData, 10000);
    setInterval(updateChat, 1000);
  }

  function updateData() {
    conn.exec('listplayers', function (players) {
      io.broadcast('players', players.body);
    });
  }
  function updateChat() {

    conn.exec('getchat', function (chat) {
      io.broadcast('chat', chat.body);
    });
  }
  function saveArkConfig(newFile) {
    fs.writeFile(config.arkConfig, newFile, function (err) {
      if (err) console.log(err);
      else { }
    });
  }

  function updateClientConfig(req, newFile) {
    req.io.broadcast('arkConfig', newFile);
  }

  function sendArkConfig(socket) {
    fs.readFile(config.arkConfig, function (err, data) {
      if (err) console.log(err);
      socket.emit('arkConfig', data.toString());
    });
  }
};
