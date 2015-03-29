'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogNewCtrl
 * @description
 * # DogNewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogNewCtrl', function ($scope, FactoryDog, flash, $location) {
    var init = function () {
      $scope.saveBtnText = 'Create';
      $scope.dog = {};
    };

    $scope.saveBtn = function() {
      if($scope.dogEditForm.$valid) {
        FactoryDog.post($scope.dog)
          .success(function (response) {
            flash.success = 'Dog Created';
            $location.path('/dog/' + response.id);
          })
          .error(function () {
            flash.error = 'Error saving dog';
          });
      }
    };

    init();
  });
