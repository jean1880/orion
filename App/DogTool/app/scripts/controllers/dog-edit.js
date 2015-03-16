'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogEditCtrl', function ($scope, $routeParams, $location, FactoryDog, flash) {
    var init = function() {
      loadDog($routeParams.id);

      $scope.saveBtnText = 'Save Changes';
    };

    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          dog.Birthdate = new Date(dog.Birthdate);

          $scope.dog = dog;
        })
        .error(function () {
          $location.path('/');
        });
    };

    $scope.saveBtn = function() {
      FactoryDog.update($scope.dog)
        .success(function () {
          flash.success = 'Changes saved';
          $location.path('/dog/' + $scope.dog.id);
        })
        .error(function () {
          flash.error = 'Error saving dog';
        });
    };

    init();
  });