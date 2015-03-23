'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCardCtrl
 * @description
 * # DogCardCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogCardCtrl', function ($scope, $location) {
    $scope.onClick = function() {
      $location.path('/dog/' + $scope.dog.id);
    };
  });
