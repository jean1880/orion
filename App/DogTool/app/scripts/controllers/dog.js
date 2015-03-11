'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogCtrl', function ($scope, $routeParams, $location, FactoryDog, flash) {
    var init = function() {
      if($routeParams.id) {
        loadDog($routeParams.id);
      }
      else {
        loadAllDogs();
      }
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

    $scope.editBtn = function() {
      if($scope.dog){
        $location.path('/dog/' + $scope.dog.id + '/edit');
      }
    };

    $scope.saveBtn = function() {
      if($scope.dog){
        FactoryDog.update($scope.dog)
          .success(function () {
            flash.success = 'Changes saved';
            $location.path('/dog/' + $scope.dog.id);
          })
          .error(function () {
            flash.error = 'Error saving dog';
          });
      }
    };

    init();
  });
