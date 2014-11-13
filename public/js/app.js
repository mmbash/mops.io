angular.module('mopsiApp', ['ui.bootstrap', 'ui.router', 'ngResource', 'movieApp.controllers', 'movieApp.services', 'datatables']);

angular.module('mopsiApp').config(function ($stateProvider, $httpProvider) {
  $stateProvider
    .state('viewRepos', { //viewXY wird über ui-sref von xy.html aufgerufen
      url: '/repos/:name', //afaik muss url eindeutig sein
      templateUrl: 'partials/repos.html',
      controller: 'ReposController'
    }).state('Settings', {
      url: '/settings',
      templateUrl: 'partials/settings.html',
      controller: 'SettingsController'
    }).state('viewReposTags', {
      url: '/repos/:name/tags',
      templateUrl: 'partials/image-tags.html',
      controller: 'ReposTagsController'
    }).state('viewImageLayer', {
      url: '/repos/:name/image/:id/layer',
      templateUrl: 'partials/image-details.html',
      controller: 'ImageLayerController'
    }).state('viewMovie', {
      url: '/movies/:name/view',
      templateUrl: 'partials/image-details.html',
      controller: 'MovieViewController'
    }).state('viewTags', {
      url: '/image/:name/tags',
      templateUrl: 'partials/image-tags.html',
      controller: 'ImageTagsController'
    }).state('viewAppDeploy', {
      url: '/image/:reponame/:tag/deploy',
      templateUrl: 'partials/app-deploy.html',
      controller: 'AppDeployController'
    }).state('newMovie', {
      url: '/movies/new',
      templateUrl: 'partials/movie-add.html',
      controller: 'MovieCreateController'
    }).state('editMovie', {
      url: '/movies/:id/edit',
      templateUrl: 'partials/movie-edit.html',
      controller: 'MovieEditController'
    }).state('appDetails', {
      url: '/apps/:id/details',
      templateUrl: 'partials/app-details.html',
      controller: 'AppDetailsController'
    }).state('apps', {
      url: '/apps',
      templateUrl: 'partials/apps.html',
      controller: 'AppsController'
    });
}).run(function ($state) {
  $state.go('viewRepos'); //Standard Startview
});
