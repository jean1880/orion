'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogCtrl', function ($scope, $routeParams, $location, FactoryDog) {
    var dogID = $routeParams.id;
    FactoryDog.get(dogID)
      .success(function (response) {
        var dog = response;

        dog.AgeYears = new Date().getYear() - new Date(dog.Age).getYear();

        $scope.dog = dog;
      })
      .error(function () {
        $location.path('/');
      });

    $scope.editBtn = function() {
      $location.path('/dog/' + dogID + '/edit');
    };

    $scope.saveBtn = function() {
      FactoryDog.update($scope.dog)
        .success(function () {
          $location.path('/dog/' + dogID);
        })
        .error(function () {
        });
    };
  });
