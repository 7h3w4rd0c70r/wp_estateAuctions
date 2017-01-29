
var app = require('express')();
var http = require('http');

app.use('/', require('./routes/login.js'));

var server = http.createServer(app);

require('./sockets/auction.js')(server);

server.listen(8087, function () {
  console.log('Listening on port ', server.address().port);
});
