/*
 * Class to represent a mespsphere object
 */
var request = require('request');
var _ = require('underscore');
var async = require('async');
var config = require('./config.js');

function Mesos(mesosMasters) {
  this._mesosMasters = mesosMasters;
  this._activeMaster = "";
}

Mesos.prototype.getAllSlaves = function (callback) {
  this.getActiveMesosMaster(function getAllSlavesIntern(_activeMaster) {
    request.get('http://' + _activeMaster + ':5050' + '/state.json', function getContent(err, response, body) {

      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }

      var result = [];
      for (var i = 0; i < data.slaves.length; i++) {
        /*console.log(data.slaves[i]);*/
        result.push(data.slaves[i].hostname);
      }
      callback(result);
    })
  })
};

Mesos.prototype.debug = function (callback) {
  this.getActiveMesosMaster(function getAllSlavesIntern(id) {
    console.log('hier mit' + id);
    callback('testtrallal');
  });
};

Mesos.prototype.getActiveMesosMaster = function (callback) {
  for (var i = 0; i < this._mesosMasters.length; i++) {
    request.get(this._mesosMasters[i] + '/metrics/snapshot', function getActiveMaster(err, response, body) {
      data = JSON.parse(body);
      if (data['master/elected'] === 1) {
        this._activeMaster = response.request.uri.hostname;
        callback(this._activeMaster);
      }
    })
  }
}

Mesos.prototype.getAllContainersOfaApp = function (callback) {
  this.getAllSlaves(loopThroughDockerHosts);

  function loopThroughDockerHosts(dockerHosts) {
    var asyncTasks = [];
    for (var i = 0; i < dockerHosts.length; i++) {
      (function (i) {
        asyncTasks.push(
          function (callback) {
            console.log('dockerhost' + dockerHosts);
            request.get('http://' + dockerHosts[i] + ':' + config.DOCKERPORT + config.DOCKERLIST, function getContent(err, response, body) {
              var containerOnHost = {
                dockerHost: response.request.uri.hostname,
                dockerContainer: body
              };
              console.log('Containeronhost' + containerOnHost);
              callback(err, containerOnHost);
            })
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
    var dockerContainerOnHostMap = [];
    for (var i = 0; i < results.length; i++) {
      data = JSON.parse(results[i].dockerContainer);
      for (var j = 0; j < data.length; j++) {
        var dockerContainerOnHost = {
          dockerHost: results[i].dockerHost,
          dockerContainer: data[j].Id
        };
        dockerContainerOnHostMap.push(dockerContainerOnHost);
      }
    }
    console.log(dockerContainerOnHostMap);
    inspectAllDockerContainers(dockerContainerOnHostMap);
  };

  function test(appMapDockerContainerMap) {
    console.log('in test');
    console.log(appMapDockerContainerMap);
  }

  function inspectAllDockerContainers(dockerContainerOnHostMap) {
    var appMapDockerContainerMap = [];
    var asyncTasks = [];

    for (var i = 0; i < dockerContainerOnHostMap.length; i++) {
      (function (i) {
        asyncTasks.push(
          function (callback) {
            request.get('http://' + dockerContainerOnHostMap[i].dockerHost + ':' + config.DOCKERPORT + '/containers/' + dockerContainerOnHostMap[i].dockerContainer + '/json', function getContent(err, response, body) {
              try {
                data = JSON.parse(body);
                var mesosMount = '';
                for (var i = 0; i < data.Config.Env.length; i++) {
                  var res = data.Config.Env[i].split('=');
                  if (res[0] === 'MESOS_SANDBOX') {
                    mesosMount = res[1];
                  }
                }
                var appName = data.Volumes[mesosMount].split('executors')[1].split('.')[0].substring(1);
                var appMapDockerContainer = {
                  appName: appName,
                  dockerHost: response.request.uri.hostname,
                  dockerId: data.Id
                }
                callback(err, appMapDockerContainer);
              } catch (e) {
                console.log(e);
              }
            })
          }
        )
      })(i)
    }
    getDockerMapContainerArray(asyncTasks);
  }

  function getDockerMapContainerArray(asyncTasks) {
    async.parallel(asyncTasks, appendToDockerMapResult);
  };

  function appendToDockerMapResult(err, results) {
    callback(results);
  }
}

module.exports = Mesos;
