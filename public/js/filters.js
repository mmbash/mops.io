angular.module('mopsiApp.filters', [])

.filter('removeHTTP', function () {
  return function (url) {
    return url.replace(/^https?:\/\//, '');
  };
});
