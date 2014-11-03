angular.module('movieApp.services', [])

.factory('Movie', function ($resource) {
  return $resource('http://192.168.1.188:5000/v1/search/:name', {
    name: '@_name'
  }, {
    update: {
      method: 'PUT',
      isArray: false
    },
    query: {
      method: "GET",
      // headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
      isArray: false
    }
  });
})

.factory('Repos', function ($resource) {
  return $resource('/v1/repos', {
    //return $resource('../app-details.json', {
    apps: '@_apps'
  }, {
    query: {
      method: "GET",
      isArray: false
    }
  });
})

.factory('ReposTags', function ($resource) {
  return $resource('/v1/tags', {
    //return $resource('../tags.json', {
    name: '@_name'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLT


.factory('App', function ($resource) {
  return $resource('http://cors-proxy.mops.io/192.168.1.180:8080/v2/apps/:id', {
    // return $resource('../apps.json', {
    id: '@_id'
  }, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
})

.factory('AppDetails', function ($resource) {
  return $resource('http://cors-proxy.mops.io/192.168.1.180:8080/v2/apps/:apps', {
    //return $resource('../app-details.json', {
    apps: '@_apps'
  }, {
    query: {
      method: "GET",
      isArray: true
    }
  });
})
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
