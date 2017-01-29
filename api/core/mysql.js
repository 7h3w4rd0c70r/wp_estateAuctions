
var mysql = require('mysql-promise')();

mysql.configure({
    host     : '127.0.0.1',
    user     : 'auctions',
    password : 'auctions',
    database : 'estate_auctions'
});

module.exports = mysql;
