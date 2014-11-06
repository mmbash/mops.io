angular.module('movieApp.controllers', [])

.controller('ReposController', function ($scope, $stateParams, popupService, $window, $modal, $log, Repos, ReposDelete) {
  $scope.repos = Repos.get({
    id: $stateParams.id
  });
  $scope.deleteRepo = function (name) {
    if (popupService.showPopup('Really delete ' + name + '?')) {
      ReposDelete.get({
        name: name
      });
      $window.location.href = '';
    }
  }
  ////
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size, name) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
        name: function () {
          console.log('Size: ' + size + ' und Repo: ' + name);
          return name;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

  ///
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, name) {

  $scope.items = items;
  $scope.reponame = name;

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

.controller('ReposTagsController', function ($scope, $stateParams, ReposTags) {
  $scope.reponame = $stateParams.name;
  console.log('Tags ' + $stateParams.name);

  $scope.tags = ReposTags.get({
    name: $stateParams.name
  });
})

.controller('ImageLayerController', function ($scope, $stateParams, ImageLayer) {

  $scope.details = ImageLayer.get({
    id: $stateParams.id
  });
})

.controller('AppsController', function ($scope, $stateParams, popupService, $window, Apps, AppKill) {
  $scope.apps = Apps.get({
    id: $stateParams.id
  });
  $scope.appKill = function (name) {
    if (popupService.showPopup('Really kill ' + name + '?')) {
      AppKill.get({
        name: name
      });
      $window.location.href = '';
    }
  }
})

.controller('AppDetailsController', function ($scope, $stateParams, AppDetails) {

  $scope.details = AppDetails.get({
    id: $stateParams.id
  });
})

.controller('AppDeployController', function ($scope, $state, $stateParams, AppDeploy, config) {
  console.log('registryhos ' + config.REGISTRYHOST);
  $scope.form = {
    reponame: $stateParams.reponame,
    tag: $stateParams.tag
  };

  $scope.app = new AppDeploy();

  $scope.appDeploy = function () {

    image: $stateParams.reponame

    $scope.app.$save(function () {
      console.log('image ' + $stateParams.reponame);
      $state.go('apps'); // ruft /apps in app.js auf?
    });
  }
})
  .controller('MovieViewController', function ($scope, $stateParams, Movie) { //bei neuen controllern und bezeichnungen auf ($scope, $stateParams, ---->Movie<---) achten!

    $scope.movie = Movie.get({ //ruft .factory Movie in services.js auf
      id: $stateParams.id // übergibt id, damit der service mit der var "id " arbeiten kann
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
