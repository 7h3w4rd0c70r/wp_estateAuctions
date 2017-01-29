
var mysql = require('../core/mysql.js');

module.exports = {
    getById: function (token) {
        return mysql
            .query('SELECT currentPrice, (SELECT bidder FROM tokens WHERE token = A.currentWinner) AS currentWinner FROM auctions A WHERE id = (SELECT auctionId FROM tokens WHERE token = ?)', [ token ]);
    },
    bid: function (token, amount) {
        mysql
            .query('UPDATE auctions SET currentPrice = currentPrice + ?, currentWinner = ? WHERE id = (SELECT auctionId FROM tokens WHERE token = ?)', [ Number(amount), token, token ]);
    },
    create: function (name, startPrice) {
        mysql
            .query('INSERT INTO auctions(name,currentPrice,currentWinner) VALUES (?, ?, NULL)', [ name, startPrice ]);
    }
}