/*
* Class to represent a mespsphere object
*/
var request = require('request');
var _ = require('underscore');
var _mesosMasters = [];

function Mesos(mesosMasters) {
	this._mesosMasters = mesosMasters;
}

Mesos.prototype.getAllSlaves = function (callback) {
	request.get(this._mesosMasters[0] + '/state.json',function getContent(err, response, body){
		data = JSON.parse(body)
		var result = [];
    for (var i=0; i<data.slaves.length; i++) {
			/*console.log(data.slaves[i]);*/
			result.push(data.slaves[i].hostname);
		} 
		callback(result);
  });	 
};

Mesos.prototype.getActiveMesosMaster = function (callback) {
	for (var i=0; i<this._mesosMasters.length; i++) {
		request.get(this._mesosMasters[i] + '/metrics/snapshot',function getContent(err, response, body){
    	data = JSON.parse(body);
			console.log(data);
			if (data['master/elected'] === 1) {
				console.log('es gib ein mesosmaster' +i);
				/*callback(this._mesosMasters[i]);*/
			}
		}
	)}
}

module.exports = Mesos;
