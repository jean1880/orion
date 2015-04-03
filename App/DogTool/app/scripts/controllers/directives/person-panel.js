'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogPersonPanelCtrl
 * @description
 * # DogPersonPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonPanelCtrl', function ($scope, FactoryPeople) {
    var init = function () {
      $scope.editMode = false;
    };

    $scope.enableEditMode = function () {
      $scope.editMode = true;
   	};

   	$scope.disableEditMode = function () {
      $scope.editMode = false;

      //communicate to the person-select-create directive to tell it to reset
      $scope.$broadcast('editMode.disabled');
   	};

    $scope.personIdChanged = function (newId) {
      FactoryPeople.get(newId)
        .success(function (response) {
          $scope.person = response;
          $scope.disableEditMode();

          if($scope.personUpdated){
            $scope.personUpdated(newId);
          }
        });
    };

    init();
  });
