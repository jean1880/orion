'use strict';

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
      if($scope.infoForm.$dirty) {
        FactoryDog.update($scope.editedDog)
          .success(function (response) {
            processDog(response);
            $scope.dog = response;
            $scope.editingInfo = false;
            $scope.infoForm.$setDirty(false);
          })
          .error(function () {});
      }
      else {
        $scope.editingInfo = false;
      }
    };

    $scope.cancelInfoBtn = function() {
      $scope.editingInfo = false;
    };

    var processDog = function (dog) {
      dog.Birthdate = new Date(dog.Birthdate);
      dog.Age = moment(dog.Birthdate).fromNow(true);
    };
  });
