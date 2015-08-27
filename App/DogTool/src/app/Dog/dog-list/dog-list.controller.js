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
    $scope.pagination = {
      currentPage: 1,
      limit: 9
    }
    $scope.showDeceased = false;
    var init = function () {
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