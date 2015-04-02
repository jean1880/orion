'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogPersonPanelCtrl
 * @description
 * # DogPersonPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogPersonPanelCtrl', function ($scope) {
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

    init();
  });
