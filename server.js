var express = require('express');
var app = express();

var distPath = __dirname + '/dist/';
app.use(express.static(distPath));

var server = app.listen(process.env.PORT || 5000, function() {
    var port = server.address().port;
    console.log('App now running on port ', port);
});

