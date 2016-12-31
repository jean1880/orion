'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogListCtrl', function ($scope, $location, FactoryDog, flash, $localStorage, $stateParams) {
    $scope.pagination = {
      currentPage: 1,
      limit: 9
    };
    $scope.showDeceased = false;
    var init = function () {
      loadAllDogs();
    };

    var loadAllDogs = function () {
      $scope.dogs = $localStorage.dogs;
      FactoryDog.getAllNoPopulate()
        .then(function (response) {
          var found = false;
          $localStorage.dogs.splice(0, $localStorage.dogs.length);
          for (var x = response.length - 1; x >= 0; x--) {
            $localStorage.dogs.push(response[x]);
          }
          $scope.dogs = $localStorage.dogs;;
        })
       .catch(function () {
          flash.error = 'A error occured while loading dogs.';
        });
    };

    init();
  });
