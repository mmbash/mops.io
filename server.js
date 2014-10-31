// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT_RUNTIME || process.env.PORT || 3000;
var request = require('request');

app.get('/api/repos', function (req, res) {
  request('http://localhost:5000/v1/search', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // from within the callback, write data to response, essentially returning it.
      parsedBody = JSON.parse(body);
      console.log(typeof (parsedbody))
      console.log(body)
      res.send(parsedBody);
    }
  })
});


app.use(express.static(__dirname + '/public'));

// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.get('/sample', function (req, res) {
  res.send('this is a sample!');
});

// we'll create our routes here

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Mopsi snoops on port ' + port);
