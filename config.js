// Class to define the urls for the rest interface
// Version v1
// author: marc.zimmermann@mmbash.de and mike.michel@mmbash.de

// Docker Registry
//exports.REGISTRYHOST = 'http://192.168.1.188:5000/v1';
exports.REGISTRYHOST = 'http://127.0.0.1:5000/v1';

exports.REGLISTREPOS = '/v1/search';
exports.REGREPOSTAGS = '/v1/repositories/';
exports.REG_IMAGE_LAYER = '/v1/images/';

exports.REGCHANGEAPP = '/v1/apps/:id';
exports.REGGETINFOSAPP = '/v1/apps/:id';

exports.ROUTEREGTAGS = '/v1/tags';

// Deployment url
exports.LISTAPPS = '/v1/apps';
exports.DEPLOYAPP = '/v1/apps';
exports.DELETEAPP = '/v1/apps/:id';
exports.CHANGEAPP = '/v1/apps/:id';
exports.GETINFOSAPP = '/v1/apps/:id';

//events
exports.ADDEVENTSUBSCRIBER = '/v1/eventSubscriptions';
exports.DELETEEVENTSUBSCRIBER = '/v1/eventSubscriptions';
exports.LISTEVENTSUBSCRIBER = '/v1/eventSubscriptions';

// marathon stuff
exports.MARATHONHOST = 'http://mesosmaster01:8080';
//exports.MARATHONHOST = 'http://192.168.1.180:8080';


exports.MARATHONLISTAPPS = '/v2/apps';
exports.MARATHONDEPLOYAPP = '/v2/apps';
exports.MARATHONDELETEAPP = '/v2/apps/';
exports.MARATHONCHANGEAPP = '/v2/apps/';
exports.MARATHONGETINFOSAPP = '/v2/apps/';
exports.MARATHONADDEVENTSUBSCRIBER = '/v2/eventSubscriptions';
exports.MARATHONDELETEEVENTSUBSCRIBER = '/v2/eventSubscriptions';
exports.MARATHONLISTEVENTSUBSCRIBER = '/v2/eventSubscriptions';

// docker stuff
exports.DOCKERHOSTARRAY = ['http://mesosmaster02:4243', 'http://mesosmaster01:4243'];
exports.DOCKERHOST1 = 'http://mesosmaster02:4243';
exports.DOCKERHOST2 = 'http://mesosmaster02:4243';
exports.DOCKERPORT = '4243';
exports.DOCKERLOG = '/containers/:id/logs';
exports.DOCKERLIST = '/containers/json';
exports.DOCKERLOGPART1 = '/containers/';

//mesosphere stuff
exports.LISTMESOSSLAVES = '/v1/getslaves';
