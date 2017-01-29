
var router = require('express').Router();

var Auction = require('../models/Auction.js');

router.get('/', function (req, res) {
    res.send('Welcome in our estate auction hall.');
});

router.post('/login', function (req, res) {
    
});

router.post('/invite', function (req, res) {
    
});

router.get('/create', function (req, res) {
    
});

router.post('/auction', function (req, res) {
    Auction
        .create(req.body['name'], req.body['startPrice']);
    res.send(JSON.stringify({
        status: 'ok'
    }));
});

module.exports = router;
