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
    }

    $scope.enableEditMode = function () {
      $scope.editMode = true;
   	};

   	$scope.disableEditMode = function () {
      $scope.editMode = false;
   	};

    init();
  });
