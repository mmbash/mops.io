angular.module('mopsiApp.services', [])

var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
  return window._; // assumes underscore has already been loaded on the page
})


// Global Timeout for connection errors
.factory('timeoutHttpIntercept', function ($rootScope, $q) {
  return {
    'request': function (config) {
      config.timeout = 5000;
      return config;
    }
  };
})

.factory('Settings', function ($resource) {
  return $resource('/settings/:host/:ip', {
    registry: '@registry',
    marathon: '@marathon'

  });
})

.factory('Repos', function ($resource) {
  return $resource('/v1/repos/:name', {
    name: '@_name'
  }, {
    query: {
      method: "GET",
      isArray: false
    }
  });
})

.factory('ReposDelete', function ($resource) {
  return $resource('/v1/deleterepos/:name', {
    name: '@_name'
  }, {
    query: {
      method: "DELETE",
      isArray: false
    }
  });
})

.factory('ReposTags', function ($resource) {
  return $resource('/v1/tags', {
    name: '@_name'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

.factory('TagDelete', function ($resource) {
  return $resource('/v1/deletetags', {
    reponame: '@_name',
    tag: ' @_tag'

  }, {
    query: {
      method: "GET",
      isArray: false
    }
  });
})

.factory('ImageLayer', function ($resource) {
  return $resource('/v1/layer', {
    id: '@id'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

.factory('DeleteRepo', function ($resource) {
  return $resource('/v1/repo/delete', {
    name: '@name'
  }, {
    query: {
      method: "DELETE",
      isArray: true
    }
  });
})

.factory('Apps', function ($resource) {
  return $resource('/v1/apps', {
    id: '@id'
  }, {
    query: {
      method: "GET",
      isArray: true,
      cache: true
    }
  });
})

.factory('AppDetails', function ($resource) {
  return $resource('/v1/apps/:id', {
    id: '@id'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

.factory('AppKill', function ($resource) {
  return $resource('/v1/apps/:id', {
    id: '@id'
  }, {
    delete: {
      method: "DELETE",
      isArray: false
    }
  });
})

.factory('AppDeploy', function ($resource) {
  return $resource('/v1/apps', {
    tag: 'tag'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

.factory('Debug', function ($resource) {
  return $resource('/debug', {}, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLL

.service('popupService', function ($window) {
  this.showPopup = function (message) {
    return $window.confirm(message);
  }
});
