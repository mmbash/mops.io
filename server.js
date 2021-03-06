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
var getIPs = getIp();
// var marathonip = getIp();
var _ = require('underscore');
var async = require('async');
var docker = require('dockerode');
var Mesos = require('./mesos.js');
var mesos = new Mesos (['http://192.168.1.180:5050']);
//var mesos = new Mesos (['http://10.141.141.10:5050']);
var raw = require('docker-raw-stream');

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS settings (marathon TEXT, registry TEXT, mesos TEXT,id INT)");
  db.run("REPLACE INTO settings (marathon, registry, mesos, id) VALUES('http://192.168.1.180:8080','http://192.168.1.188:5000','http://192.168.1.180:5050','1')");
  getIp();
});

function getIp(req, res) {
  db.get('SELECT * FROM settings', function (error, row) {
    if (error !== null) {
      console.error(error);
    } else {
      registryip = row.registry;
      marathonip = row.marathon;
      mesosip  = row.mesos;

      console.log(row);
      console.log('IPs:' + registryip + ' ' + marathonip+ ' ' + mesosip);
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
app.get('/v1/tags', function (req, res) {
  console.log('Get tags');
  req.pipe(request.get(registryip + config.REGREPOSTAGS + req.param("name") + '/tags', function (error, response, body) {
    console.log('[' + new Date() + '] ', req.url);
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// DELETE TAGS
app.get('/v1/deletetags', function (req, res) {
  console.log('Delete tag');
  req.pipe(request.del(registryip + config.REGREPOSTAGS + req.param("reponame") + '/tags/' + req.param("tag"), function (error, response, body) {
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

// delete a app
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

// add a event subscriber
app.post(config.ADDEVENTSUBSCRIBER, function addEventSubscriber(req, res) {
  console.log('Add event subscriber');
  req.pipe(request.post(marathonip + config.MARATHONADDEVENTSUBSCRIBER, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// delete a event subscriber
app.delete(config.DELETEEVENTSUBSCRIBER, function addEventSubscriber(req, res) {
  console.log('Delete event subscriber');
  req.pipe(request.post(marathonip + config.MARATHONDELETEEVENTSUBSCRIBER, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// list event subscriber
app.get(config.LISTEVENTSUBSCRIBER, function addEventSubscriber(req, res) {
  console.log('List event subscriber');
  req.pipe(request.post(marathonip + config.MARATHONLISTEVENTSUBSCRIBER, function (error, response, body) {
    if (error) {
      console.error('Connection error: ' + error.code);
    }
  })).pipe(res);
});

// get docker logs of a running app
app.get(config.DOCKERLOG, function getDockerLog(req, res) {
  console.log('Get logs of an app: ' + req.params.id);

	var combinedStream = CombinedStream.create();
  var asyncTasks= [];

	mesos.getAllContainersOfaApp(function getAllContainersOfApp(appArray) {
		for (var i=0; i<appArray.length;i++) {
			if (appArray[i].appName === req.params.id) {
				(function(i) {
				asyncTasks.push(
					function(callback){
						req.pipe(request.get({
							url: 'http://' + appArray[i].dockerHost + ':4243' + config.DOCKERLOGPART1 + appArray[i].dockerId + '/logs?stderr=1&stdout=1&tail=10',
							qs: req.query
						}, function (error, response, body) {
							if (error) {
								console.error('Connection error: ' + error.code);
							}
							console.log('hier');
						})).pipe(res);
				})
			})(i)
			}
		}
    connectToDockerHostsToLog(asyncTasks);
	});

	function connectToDockerHostsToLog(asyncTasks) {
		async.parallel(asyncTasks);
  };

});

// get running docker containers
app.get(config.DOCKERLIST, function getDockerContainers(req, res) {
  console.log('Get all containers');
  mesos.getAllSlaves(loopThroughDockerHosts);

  function loopThroughDockerHosts(dockerHosts) {
    var asyncTasks = [];
    for (var i = 0; i < dockerHosts.length; i++) {
      (function (i) {
        asyncTasks.push(
          function (callback) {
            req.pipe(request.get('http://' + dockerHosts[i] + ':' + config.DOCKERPORT + config.DOCKERLIST, function getContent(err, response, body) {
              console.log(body);
              callback(err, body);
            }))
          }
        )
      })(i);
    }
    connectToDockerHosts(asyncTasks);
  };

  function connectToDockerHosts(asyncTasks) {
    async.parallel(asyncTasks, appendToResult);
  };

  function appendToResult(err, results) {
    res.send(results);
  };

});

// get all mesos slaves
app.get('/v1/getslaves', function getMesosSlaves(req, res) {
  console.log('Get all mesoslaves');
  mesos.getAllSlaves(function logSlaves(body) {
    res.send(body);
  });
});

// debug function
app.get('/debug', function getMesosSlaves(req, res) {
  console.log('Debug');
	mesos.getAllContainersOfaApp(function getAllContainersOfApp(body) {
		res.send(body);
	});
});

//callback for mesos
app.post('/marathoncallback',function(req,res) {
  console.log(req.body);
  console.log("\n");
  /*Send 200*/
  res.status(200).end()
});

// catch uncaught exception
process.on('uncaughtException', function (err) {
  console.error('uncaughtException: ' + err.message);
  console.error(err.stack);
  process.exit(1);
});

// streamtest
app.get('/streamtest/:id/logs', function getDockerLog(req, res) {
  console.log('Get logs of an app: ' + req.params.id);

  var combinedStream = CombinedStream.create();
  var asyncTasks = [];

// forward the output to stdio
  var decode = raw.decode({halfOpen:true});
decode.stdout.pipe(res);
//decode.stderr.pipe(res);

  mesos.getAllContainersOfaApp(function getAllContainersOfApp(appArray) {

    for (var i = 0; i < appArray.length; i++) {
      if (appArray[i].appName === req.params.id) {
        (function (i) {
          asyncTasks.push(
            function (callback) {
              req.pipe(request.get({
                url: 'http://' + appArray[i].dockerHost + ':4243' + config.DOCKERLOGPART1 + appArray[i].dockerId + '/logs?stderr=1&stdout=1&tail=10',
                qs: req.query
              }, function (error, response, body) {
                if (error) {
                  console.error('Connection error: ' + error.code);
                } if (response){
                  console.log('Response: ' + response);

                }if (body) {
                console.log('Body: ' + body);
                }

              })).pipe(decode)
            })
        })(i)
      }
    }
    connectToDockerHostsToLog(asyncTasks);
  });


  function connectToDockerHostsToLog(asyncTasks) {
    async.parallel(asyncTasks);
  };
});

// boag

app.get('/fuit', function (req, res) {

// forward the output to stdio
decode.stdout.pipe(res);
decode.stderr.pipe(process.stderr);

  console.log('Get fuck');
  url= 'http://192.168.1.180:4243/containers/dec8ad75eb5b/logs?stderr=1&stdout=1&timestamps=1&tail=10&stream=1'
  request.get(url).pipe(decode);
});

app.use(express.static(__dirname + '/public'));

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Mopsi  aka mopsi brain snoops on port ' + port);
