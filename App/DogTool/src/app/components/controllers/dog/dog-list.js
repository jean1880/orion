'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogListCtrl', function ($scope, $location, FactoryDog, flash) {
    var init = function() {
      loadAllDogs();
    };

    var loadAllDogs = function () {
      $scope.dogs = null;

      FactoryDog.getAll()
        .success(function (response) {
          $scope.dogs = response;
        })
        .error(function () {
          flash.error = 'A error occured while loading dogs.';
        });
    };

    init();
  });
