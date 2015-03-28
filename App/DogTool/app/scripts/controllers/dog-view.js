'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogViewCtrl', function ($scope, $routeParams, $location, FactoryDog) {
    var init = function() {
      loadDog($routeParams.id);

      $scope.editingInfo = false;
    };

    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          processDog(dog);

          $scope.dog = dog;
        })
        .error(function () {
          $location.path('/');
        });
    };

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

    init();
  });
