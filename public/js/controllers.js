angular.module('mopsiApp.controllers', [])

.controller('ReposController', function ($scope, $stateParams, popupService, $window, $modal, $log, dialogs, Repos, ReposDelete, _) {
  $scope.repos = Repos.get({
      id: $stateParams.id
    },
    function () {
      //connection ok
      //$scope.reposArray = _.toArray($scope.repos.results); //not needed anymore but still cool example for underscore.js
      $scope.currentPage = 1;
      $scope.pageSize = 10;
    }, function (response) {
      //connection bad
      if (response.status !== 200) {
        dialogs.error('CONNECTION ERROR!', 'Can not connect to your registry server. Check your Settings!');
      }
    });

  $scope.deleteRepo = function (name) {
    if (popupService.showPopup('Really delete ' + name + '?')) {
      ReposDelete.get({
        name: name
      });
      $window.location.href = '';
    }
  }

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

.controller('ReposTagsController', function ($scope, $stateParams, popupService, $window, $modal, ReposTags, TagDelete) {
  $scope.reponame = $stateParams.name;
  console.log('Tags ' + $stateParams.name);

  $scope.tags = ReposTags.get({
    name: $stateParams.name
  });
  $scope.deleteTag = function (tag, reponame) {
    if (popupService.showPopup('Really delete ' + reponame + ':' + tag + '?')) {
      TagDelete.get({
        reponame: reponame,
        tag: tag
      });
      $window.location.href = '';
    }
  }
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

.controller('AppsController', function ($scope, $stateParams, popupService, $window, Apps, $timeout, $interval, AppKill) {

  $scope.intervalApps = function () {
    $timeout(function () {
      Apps.get({
        id: $stateParams.id
      }, function (data) {
        $scope.apps = data;
        $scope.intervalApps();
      }, 5000);
    });
  }
  $scope.intervalApps();

  $scope.appKill = function (name) {
    if (popupService.showPopup('Really kill ' + name + '?')) {
      AppKill.delete({
        id: name,
      });
      console.log('Killing ' + name);
      $scope.$apply;
      $window.location.href = '#/apps';
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
