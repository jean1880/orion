'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogViewCtrl
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

    var processDog = function (dog) {
      dog.Birthdate = new Date(dog.Birthdate);
      dog.Age = moment(dog.Birthdate).fromNow(true);
    };

    init();
  });
