// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT_RUNTIME || process.env.PORT || 3000;
var request = require('request');
var config = require('./config.js');

app.get('/api/repos', function (req, res) {
  request('http://10.0.2.15:5000/v1/search', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // from within the callback, write data to response, essentially returning it.
      parsedBody = JSON.parse(body);
      console.log(typeof (parsedbody))
      console.log(body)
      res.send(parsedBody);
    }
  })
});

// list all running apps
app.get(config.LISTAPPS,function getApps(req,res) {
	console.log("Get running apps");
  try {
		req.pipe(request.get(config.MARATHONHOST + config.MARATHONLISTAPPS)).pipe(res);
  }
  catch (e) {
		console.log(e);
  }
});

// stop a app
app.delete(config.DELETEAPPS,function deleteApps(req,res) {
	console.log ("Delete an app");
  try {
		req.pipe(request.del(config.MARATHONHOST + config.MARATHONDELETEAPP + req.params.id)).pipe(res);
  }
  catch (e) {
		console.log(e);
  }
});

// start a app#
app.post(config.DEPLOYAPPS,function deployApps(req,res) {
	console.log ("Start an app");
  try {
		req.pipe(request.post(config.MARATHONHOST + config.MARATHONPUTAPPS)).pipe(res);
  }
  catch (e) {
		console.log(e);
  }
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
