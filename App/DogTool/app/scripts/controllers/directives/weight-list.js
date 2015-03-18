'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:WeightListCtrl
 * @description
 * # WeightListCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('WeightListCtrl', function ($scope, FactoryWeight) {
    var init = function () {
      $scope.countPerPage = 5;
      $scope.page = 1;

      reset();
    };

    $scope.addBtnClick = function () {
      $scope.processing = true;

      $scope.newWeight.DateTaken = new Date();
      $scope.newWeight.Dog = $scope.dog.id;

      FactoryWeight.post($scope.newWeight)
        .success(function (response) {
          $scope.dog.Weights.push(response);
          reset();
        })
        .error(function (response) {
          console.log(response);
        })
        .finally(function () {
          $scope.processing = false;
        });
    };

    $scope.convertDateTakenToDate = function(item) {
      return new Date(item.DateTaken);
    };

    var reset = function () {
      $scope.processing = false;
      $scope.newWeight = {
        Weight: null,
        DateTaken: null,
        Dog: null
      };
    };

    init();
  });
