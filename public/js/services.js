angular.module('movieApp.services', [])



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
      method: "GET",
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
      isArray: true
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
  return $resource('/v1/apps', {
    id: '@id'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
}).factory('AppDeploy', function ($resource) {
  return $resource('/v1/apps', {
    tag: 'tag'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLT

.factory('Image', function ($resource) {
  return $resource('http://cors-proxy.mops.io/192.168.1.188:5000/v1/repositories/:name/tags', {
    //return $resource('../tags.json', {
    tags: '@_tags'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})
  .factory('Details', function ($resource) {
    //        return $resource('http://192.168.1.188:5000/v1/repositories/:name/tags', {
    return $resource('../details.json', {
      name: '@_name'
    }, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  })

.service('popupService', function ($window) {
  this.showPopup = function (message) {
    return $window.confirm(message);
  }
});
