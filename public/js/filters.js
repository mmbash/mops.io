angular.module('mopsiApp.filters', [])

.filter('removeHTTP', function () {
  return function (url) {
    return url.replace(/^https?:\/\//, '');
  };
})
.filter('addbr', function () {
  return function (logs) {
return logs.split(/\n/);
//return logs.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };
});
