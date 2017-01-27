
var router = require('express').Router();

router.get('/', function (req, res) {
    res.send('Welcome in our estate auction hall.');
});

router.post('/login', function (req, res) {
    
});

router.post('/invite', function (req, res) {
    
});

router.get('/token/:token', function (req, res) {
    var token = req.params['token'];
    res.send(JSON.stringify({
        estate: 'estateId'
    }));
});

module.exports = router;
