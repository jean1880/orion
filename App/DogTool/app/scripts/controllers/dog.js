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
      .success(function(response) {
        var dog = response;

        dog.Birthdate = dog.Age;

        dog.Age = new Date().getYear() - new Date(dog.Birthdate).getYear();

        $scope.dog = dog;
      })
      .error(function(response) {
        $scope.errorMsg = "An error occured. :(";
      });

    $scope.editBtn = function() {
      $location.path("/dog/" + dogID + "/edit");
    }

    $scope.saveBtn = function() {
      FactoryDog.update($scope.dog)
        .success(function (response) {
          $location.path("/dog/" + dogID);
        })
        .error(function (response) {
          console.log(response);
          $scope.errorMsg = "An error occured. :(";
        });
    }
  });
