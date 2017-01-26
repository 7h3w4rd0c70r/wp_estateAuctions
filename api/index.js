
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
