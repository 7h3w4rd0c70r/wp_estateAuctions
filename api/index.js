/*
var app = require('express')();

app.get('/test', function (req, res) {
    var i = 1;
    setInterval(function () {
        res.write(i++ + ' seconds\n');
    }, 1000);
});

var port = 8087;
app.listen(port, function () {
    console.log('\x1b[32mListening on port ', port);
});
*/

const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  var i = 1;
  setInterval(function () {
    ws.send(i++ + ' seconds');
  }, 1000);
});

server.listen(8087, function listening() {
  console.log('Listening on %d', server.address().port);
});