/*
* Class to represent a mespsphere object
*/
var request = require('request');
var _ = require('underscore');

function Mesos(mesosMasters) {
	this._mesosMasters = mesosMasters;
}

Mesos.prototype.getAllSlaves = function (callback) {
	request.get('http://mesosmaster02:5050/state.json',function getContent(err, response, body){
		data = JSON.parse(body)
		var result = [];
    for (var i=0; i<data.slaves.length;i++) {
			/*console.log(data.slaves[i]);*/
			result.push(data.slaves[i].hostname);
		} 
		callback(result);
  });	 
};

module.exports = Mesos;
