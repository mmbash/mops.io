// server.js
// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT_RUNTIME || process.env.PORT || 3000;
var request = require('request');
var config = require('./config.js');


// REPOS
app.get('/v1/repos', function (req, res) {
  console.log('Get repos');
  req.pipe(request.get(config.REGISTRYHOST + config.REGLISTREPOS, function (error, response, body) {
    //    console.log('[' + new Date() + '] ', req);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// DELETE REPOS
app.get('/v1/deleterepos/:name', function (req, res, next) {
  req.pipe(request.del(config.REGISTRYHOST + config.REGREPOSTAGS + req.param("name") + '/', function (error, response, body) {
    console.log('[' + new Date() + '] ', req);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// TAGS
app.get('/v1/tags', function getTags(req, res) {
  console.log('Get tags');
  req.pipe(request.get(config.REGISTRYHOST + config.REGREPOSTAGS + req.param("name") + '/tags', function (error, response, body) {
    console.log('[' + new Date() + '] ', req.url);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// LAYER
app.get('/v1/layer', function getLayer(req, res) {
  console.log('Get layer');
  req.pipe(request.get(config.REGISTRYHOST + config.REG_IMAGE_LAYER + req.param("id") + '/json', function (error, response, body) {
    console.log('[' + new Date() + '] ', req.url);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});



// list all running apps
app.get(config.LISTAPPS, function getApps(req, res) {
  console.log('Get running apps');
  req.pipe(request.get(config.MARATHONHOST + config.MARATHONLISTAPPS, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// get infos of a running app
app.get(config.GETINFOSAPP, function getAppInfo(req, res) {
  console.log('Get info of app: ' + req.params.id);
  req.pipe(request.get(config.MARATHONHOST + config.MARATHONGETINFOSAPP + req.params.id, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// stop a app
app.delete(config.DELETEAPP, function deleteApps(req, res) {
  console.log('Delete an app');
  req.pipe(request.del(config.MARATHONHOST + config.MARATHONDELETEAPP + req.params.id, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// start a app
app.post(config.DEPLOYAPP, function deployApps(req, res) {
  console.log('Start an app');
  req.pipe(request.post(config.MARATHONHOST + config.MARATHONDEPLOYAPP, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// change params of a app
app.put(config.CHANGEAPP, function changeApps(req, res) {
  console.log('Change an app: ' + req.params.id);
  req.pipe(request.put(config.MARATHONHOST + config.MARATHONCHANGEAPP + req.params.id, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// catch uncaught exception
process.on('uncaughtException', function (err) {
  console.error('uncaughtException: ' + err.message);
  console.error(err.stack);
  process.exit(1);
});

app.use(express.static(__dirname + '/public'));

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Mopsi  aka mopsi brain snoops on port ' + port);
