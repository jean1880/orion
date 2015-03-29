'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogInfoPanelCtrl
 * @description
 * # DogInfoPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogInfoPanelCtrl', function ($scope, FactoryDog) {
    $scope.editInfoBtn = function() {
      $scope.editingInfo = true;
      $scope.editedDog = angular.copy($scope.dog);
      $scope.infoForm.$setDirty(false);
    };

    $scope.saveInfoBtn = function() {
      if($scope.infoForm.$valid) {
        if($scope.infoForm.$dirty) {
          updateDog($scope.editedDog);
        }
        else {
          $scope.editingInfo = false;
        }
      }
    };

    $scope.cancelInfoBtn = function() {
      $scope.editingInfo = false;
    };

    var processDog = function (dog) {
      dog.Birthdate = new Date(dog.Birthdate);
      dog.Age = moment(dog.Birthdate).fromNow(true);
    };

    var updateDog = function (dog) {
      FactoryDog.update(dog)
        .success(function (response) {
          processSuccess(response);
        })
        .error(function (response) {
          processError(response);
        });
    };

    var processSuccess = function (response) {
        processDog(response);

        $scope.dog = response;
        $scope.editingInfo = false;
        $scope.infoForm.$setDirty(false);
    };

    var processError = function (response) {
        console.log('Error occured: ' + response);
    };
});
