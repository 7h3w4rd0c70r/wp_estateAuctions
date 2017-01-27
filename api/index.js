
var app = require('express')();
var http = require('http');
var url = require('url');
var WebSocket = require('ws');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/estateAuctions');

var Auction = mongoose.model('auction', { currentPrice: { type: 'Number', default: 0 } });

app.use('/', require('./routes/login.js'));

var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server, path: '/socket' });

wss.on('connection', function (ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  
  ws.on('message', function (data) {
    data = JSON.parse(data);
    Auction.findOne({ name: 'test' })
      .exec()
      .then(function (auction) {
        Auction.update({ name: 'test' }, { currentPrice: Number(Number(auction.currentPrice) + Number(data.value)) }).exec();
      });
  });
});

setInterval(function () {
  Auction.findOne({ name: 'test' })
    .exec()
    .then(function (auction) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
              currentPrice: auction.currentPrice
          }));
        }
      });
    });
}, 200);

server.listen(8087, function () {
  console.log('\x1b[32mListening on port ', server.address().port);
});
