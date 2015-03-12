'use strict';

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
    };

    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          dog.AgeYears = new Date().getYear() - new Date(dog.Age).getYear();

          $scope.dog = dog;
        })
        .error(function () {
          $location.path('/');
        });
    };

    $scope.editBtn = function() {
      $location.path('/dog/' + $scope.dog.id + '/edit');
    };

    init();
  });
