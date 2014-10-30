angular.module('movieApp', ['ui.router', 'ngResource', 'movieApp.controllers', 'movieApp.services', 'datatables']);

angular.module('movieApp').config(function ($stateProvider, $httpProvider) {
    $stateProvider
        .state('movies', {
            url: '/movies',
            templateUrl: 'partials/movies.html',
            controller: 'MovieListController'
        }).state('viewRepos', {
            url: '/repos',
            templateUrl: 'partials/repos.html',
            controller: 'ReposController'
        }).state('viewReposTags', {
            url: '/repos/:name/tags',
            templateUrl: 'partials/image-tags.html',
            controller: 'ReposTagsController'
        }).state('viewMovie', { //viewXY wird über ui-sref von xy.html aufgerufen
            url: '/movies/:name/view', //afaik muss url eindeutig sein
            templateUrl: 'partials/image-details.html',
            controller: 'MovieViewController'
        }).state('viewTags', {
            url: '/image/:name/tags',
            templateUrl: 'partials/image-tags.html',
            controller: 'ImageTagsController'
        }).state('viewDetails', {
            url: '/image/:name/:tag/details',
            templateUrl: 'partials/image-details.html',
            controller: 'ImageDetailsController'
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
            controller: 'AppListController'
        });
}).run(function ($state) {
    $state.go('movies'); //später auf repos ändern
});