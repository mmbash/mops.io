// Class to define the urls for the rest interface
// Version v1
// author: marc.zimmermann@mmbash.de and mike.michel@mmbash.de

// Docker Registry
exports.REGISTRYHOST = 'http://192.168.1.188:5000/v1';
//exports.REGISTRYHOST = 'http://10.141.141.10:5000/v1';

exports.REGLISTREPOS = '/search';
exports.REGREPOSTAGS = '/repositories/';
exports.REG_IMAGE_LAYER = '/images/';
exports.REGCHANGEAPP = '/v1/apps/:id';
exports.REGGETINFOSAPP = '/v1/apps/:id';

exports.ROUTEREGTAGS = '/v1/tags';

// Deployment url
exports.LISTAPPS = '/v1/apps';
exports.DEPLOYAPP = '/v1/apps';
exports.DELETEAPP = '/v1/apps/:id';
exports.CHANGEAPP = '/v1/apps/:id';
exports.GETINFOSAPP = '/v1/apps/:id';

// marathon stuff
exports.MARATHONHOST = 'http://mesosmaster02:8080';
exports.MARATHONLISTAPPS = '/v2/apps';
exports.MARATHONDEPLOYAPP = '/v2/apps';
exports.MARATHONDELETEAPP = '/v2/apps/';
exports.MARATHONCHANGEAPP = '/v2/apps/';
exports.MARATHONGETINFOSAPP = '/v2/apps/';
