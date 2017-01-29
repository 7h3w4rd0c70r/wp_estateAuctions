
var mysql = require('../core/mysql.js');

module.exports = {
    getById: function (token) {
        return mysql
            .query('SELECT currentPrice, currentWinner FROM auctions WHERE id = (SELECT auctionId FROM tokens WHERE token = ?)', [ token ]);
    },
    bid: function (token, amount) {
        mysql
            .query('UPDATE auctions SET currentPrice = currentPrice + ?, currentWinner = (SELECT bidder FROM tokens WHERE token = ?) WHERE id = (SELECT auctionId FROM tokens WHERE token = ?)', [ Number(amount), token, token ]);
    }
}