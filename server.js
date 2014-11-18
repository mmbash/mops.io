// server.js
// BASE SETUP
// ==============================================

var CombinedStream = require('combined-stream');
var express = require('express');
var app = express();
var port = process.env.PORT_RUNTIME || process.env.PORT || 3000;
var request = require('request');
var config = require('./config.js');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./sqlite/mopsidb1');
var registryip = getIp();
var marathonip = getIp();
var _ = require('underscore');
var async = require('async');
var docker = require('dockerode');
var Mesos = require('./mesos.js');
var mesos = new Mesos ('http://mesosmaster01:5050');


db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS settings (marathon TEXT, registry TEXT, id INT)");
  db.run("REPLACE INTO settings (marathon, registry, id) VALUES('http://mesosmaster01:8080/','http://192.168.1.188:5000/','1')");
});

function getIp(req, res) {
  db.get('SELECT * FROM settings', function (error, row) {
    if (error !== null) {
      console.error(error);
    } else {
      registryip = row.registry;
      marathonip = row.marathon;

      console.log(row);
      console.log('IPs:' + registryip + ' ' + marathonip);
    }
  });
};

app.get('/settings', function (req, res) {
  db.get("SELECT * FROM settings WHERE id='1'", function (err, row) {
    res.json({
      "marathon": row.marathon,
      "registry": row.registry
    });
  });
});


app.post('/settings', function (req, res) {
  db.run("UPDATE settings SET marathon='" + req.param("marathon") + "', registry='" + req.param("registry") + "' WHERE id='1'", function (error, row) {
    if (error) {
      console.error(error);
      res.status(500);
    } else {
      res.status(202);
    }
    res.end();
    getIp();
  });
});

// REPOS
app.get('/v1/repos', function (req, res) {
  console.log('Get repos');
  req.pipe(request.get(registryip + config.REGLISTREPOS, function (error, response, body) {
    //req.pipe(request.get(config.REGISTRYHOST + config.REGLISTREPOS, function (error, response, body) {
    console.log('[' + new Date() + '] ', req);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// DELETE REPOS
app.get('/v1/deleterepos/:name', function (req, res, next) {
  req.pipe(request.del(registryip + config.REGREPOSTAGS + req.param("name") + '/', function (error, response, body) {
    console.log('[' + new Date() + '] ', req);
    if (error) {
      console.error('Connection error: ' + error.code);
      res.statusCode = error.code;
    }
  })).pipe(res);
});

// TAGS
app.get('/v1/tags', function getTags(req, res) {
  console.log('Get tags');
  req.pipe(request.get(registryip + config.REGREPOSTAGS + req.param("name") + '/tags', function (error, response, body) {
    console.log('[' + new Date() + '] ', req.url);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// LAYER
app.get('/v1/layer', function getLayer(req, res) {
  console.log('Get layer');
  req.pipe(request.get(registryip + config.REG_IMAGE_LAYER + req.param("id") + '/json', function (error, response, body) {
    console.log('[' + new Date() + '] ', req.url);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// list all running apps
app.get(config.LISTAPPS, function getApps(req, res) {
  console.log('Get running apps');
  req.pipe(request.get(marathonip + config.MARATHONLISTAPPS, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// get infos of a running app
app.get(config.GETINFOSAPP, function getAppInfo(req, res) {
  console.log('Get info of app: ' + req.params.id);
  req.pipe(request.get(marathonip + config.MARATHONGETINFOSAPP + req.param("id"), function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// stop a app
app.delete(config.DELETEAPP, function deleteApps(req, res) {
  console.log('Delete an app');
  req.pipe(request.del(marathonip + config.MARATHONDELETEAPP + req.params.id, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// deploy a app
app.post(config.DEPLOYAPP, function deployApps(req, res) {
  console.log('Deploy an app');
  req.pipe(request.post(marathonip + config.MARATHONDEPLOYAPP, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// change params of a app
app.put(config.CHANGEAPP, function changeApps(req, res) {
  console.log('Change an app: ' + req.params.id);
  req.pipe(request.put(marathonip + config.MARATHONCHANGEAPP + req.params.id, function (error, response, body) {
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

// get docker logs of a running app
app.get(config.DOCKERLOG, function getDockerLog(req, res) {
  console.log('Get logs of container: ' + req.params.id);

  var combinedStream = CombinedStream.create();

  combinedStream.append(req.pipe(request.get({
    url: config.DOCKERHOST1 + config.DOCKERLOGPART1 + req.params.id + '/logs',
    qs: req.query
  }, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })))

  combinedStream.append(req.pipe(request.get({
    url: config.DOCKERHOST2 + config.DOCKERLOGPART1 + req.params.id + '/logs',
    qs: req.query
  }, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })))

  combinedStream.pipe(res);
});

// get running docker containers
app.get(config.DOCKERLIST, function getDockerContainers(req, res) {
  console.log('Get all containers');
	mesos.getAllSlaves(loopThroughDockerHosts); 
	
	function loopThroughDockerHosts(dockerHosts) {
		var asyncTasks = [];
		for (var i=0; i<dockerHosts.length; i++) {
			(function(i) {
				asyncTasks.push(
					function(callback) {
						req.pipe(request.get('http://'+ dockerHosts[i] + ':' + config.DOCKERPORT + config.DOCKERLIST,function getContent(err, response, body){
						console.log(body);
						callback(err,body);
						}))
					}
				)
			})(i);
		}
    connectToDockerHosts(asyncTasks);
  };

  function connectToDockerHosts(asyncTasks) {
  	async.parallel(asyncTasks,appendToResult);
	};
  
	function appendToResult(err,results) {
		 res.send(results);
  };

});

// get all mesos slaves
app.get('/v1/getslaves', function getMesosSlaves(req, res) {
  console.log('Get all mesoslaves');
  var mesos = new Mesos ('http://mesosmaster01:5050');
  mesos.getAllSlaves(function logSlaves(body) {
    res.send(body);
	});	    
});

app.use(express.static(__dirname + '/public'));

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Mopsi  aka mopsi brain snoops on port ' + port);
