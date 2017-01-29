
var url = require('url');
var WebSocket = require('ws');

var Auction = require('../models/Auction.js');

module.exports = function (server) {
    var wss = new WebSocket.Server({
        server: server,
        path: '/rt/auction'
    });

    wss.on('connection', function (ws) {
        var req = url.parse(ws.upgradeReq.url, true);
  
        ws.on('message', function (data) {
            data = JSON.parse(data);
            Auction
                .bid(req.query.token, data.value);
        });
  
        var loop = setInterval(function () {
            Auction
                .getById(req.query.token)
                .spread(function (rows) {
                    if (ws.readyState == WebSocket.CLOSED) clearInterval(loop);
                    else if (ws.readyState == WebSocket.OPEN)
                        ws.send(JSON.stringify({
                            currentPrice: rows[0].currentPrice,
                            currentWinner: rows[0].currentWinner
                        }));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 100);
    });
}
