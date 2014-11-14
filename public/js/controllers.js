angular.module('mopsiApp.controllers', [])

.controller('ReposController', function ($q, $scope, $stateParams, popupService, $window, $modal, $log, dialogs, Repos, ReposDelete) {
  $scope.repos = Repos.get(
    function (response) {
      //good code

      console.log('Looks good ');
      $scope.repos.$promise.then(function () {
        $scope.totalItems = $scope.repos.length;
        $scope.$watch('currentPage + itemsPerPage', function () {
          var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;
          $scope.reposBla = $scope.repos.slice(begin, end);

        });

      });
      ///Pagination
      // $scope.totalItems = 64;
      $scope.currentPage = 1;
      $scope.itemsPerPage = 3;

      $scope.pageCount = function () {
        return Math.ceil($scope.repos.length / $scope.itemsPerPage);
      };

    },
    function (response) {
      //404 or bad
      if (response.status !== 200) {
        dialogs.error('CONNECTION ERROR!', 'Can not connect to your registry server. Check your Settings!');
      }
    });
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

  $scope.details = ImageLayer.get({ //ruft .factory ImageLayer in services.js auf
    id: $stateParams.id //übergibt id, damit der service mit der var "id " arbeiten kann
  });
})
  .controller('SettingsController', function ($scope, $stateParams, dialogs, Settings) {

    $scope.settings = new Settings(); //this object now has a $save() method
    $scope.updateSettings = function () {
      $scope.settings.$save(function (status) {
        dialogs.notify('Settings Saved!', 'Looks good man.');
        $state.go('viewRepos');
      }, function (error) {
        // failure
        dialogs.error('ERROR!', 'Something bad happened!');
      });
    };
    $scope.loadSettings = function () {
      $scope.settings = Settings.get();
    };
    $scope.loadSettings();
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

.controller('AppDeployController', function ($scope, $state, $stateParams, AppDeploy, Settings) {
  $scope.settings = Settings.get();
  $scope.form = {
    reponame: $stateParams.reponame,
    tag: $stateParams.tag
  };

  $scope.app = new AppDeploy();

  $scope.appDeploy = function () {

    image: $stateParams.reponame

    $scope.app.$save(function () {
      console.log('image ' + $stateParams.reponame);
      $state.go('apps'); // ruft /apps in app.js auf
    });
  }
})

.controller('ImageTagsController', function ($scope, $stateParams, Image) {

  $scope.tags = Image.get({
    name: $stateParams.name
  });
})

.controller('ImageDetailsController', function ($scope, $stateParams, Details) {

  $scope.details = Details.get({
    details: $stateParams.details
  });
})
