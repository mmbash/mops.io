angular.module('movieApp.controllers', [])

.controller('MovieListController', function ($scope, $state, popupService, $window, Movie) {

    $scope.movies = Movie.query();

    $scope.deleteMovie = function (movie) {
        if (popupService.showPopup('Really delete this?')) {
            movie.$delete(function () {
                $window.location.href = '';
            });
        }
    }
})

.controller('ReposController', function ($scope, $stateParams, Repos) {
    $scope.repos = Repos.get({
        id: $stateParams.id
    });
})

.controller('ReposTagsController', function ($scope, $stateParams, ReposTags) {

    $scope.tags = ReposTags.get({
        name: $stateParams.name
    });
})

.controller('AppListController', function ($scope, $state, $stateParams, popupService, $window, App) {
    $scope.apps = App.get({
        id: $stateParams.id
    });
    $scope.deleteApp = function (app) {
        if (popupService.showPopup('Digga, really kill this?')) {
            app.$delete(function () {
                $window.location.href = '';
            });
        }
    }
})

.controller('AppDetailsController', function ($scope, $stateParams, AppDetails) {

    $scope.details = AppDetails.get({
        id: $stateParams.id
    });

})

.controller('MovieViewController', function ($scope, $stateParams, Movie) { //bei neuen controllern und bezeichnungen auf ($scope, $stateParams, ---->Movie<---) achten!

    $scope.movie = Movie.get({ //ruft .factory Movie in services.js auf
        id: $stateParams.id // übergibt id, damit der service mit der var "id" arbeiten kann
    });
})

.controller('ImageTagsController', function ($scope, $stateParams, Image) {

    $scope.tags = Image.get({ //ruft .factory Image in services.js auf
        name: $stateParams.name
    });
})

.controller('ImageDetailsController', function ($scope, $stateParams, Details) {

    $scope.details = Details.get({
        details: $stateParams.details
    });

})

.controller('MovieCreateController', function ($scope, $state, $stateParams, Movie) {

    $scope.movie = new Movie();

    $scope.addMovie = function () {
        $scope.movie.$save(function () {
            $state.go('movies');
        });
    }

})

.controller('MovieEditController', function ($scope, $state, $stateParams, Movie) {

    $scope.updateMovie = function () {
        $scope.movie.$update(function () {
            $state.go('movies');
        });
    };

    $scope.loadMovie = function () {
        $scope.movie = Movie.get({
            id: $stateParams.id
        });
    };

    $scope.loadMovie();
});