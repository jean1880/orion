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
      $scope.weightFormSubmitted = weightFormSubmitted;
      $scope.convertDateTakenToDate = convertDateTakenToDate;

      $scope.countPerPage = 5;
      $scope.page = 1;

      reset();
    };

    var weightFormSubmitted = function () {
      if($scope.weightForm.$valid) {
        $scope.processing = true;

        prepareNewWeight($scope.newWeight);

        FactoryWeight.post($scope.newWeight)
          .success(processValidPost)
          .error(processInvalidPost)
          .finally(postComplete);
      }
    };

    var convertDateTakenToDate = function(weight) {
      return new Date(weight.DateTaken);
    };

    var processValidPost = function (response) {
      $scope.dog.Weights.push(response);
      reset();
    };

    var prepareNewWeight = function (weight) {
      weight.DateTaken = new Date();
      weight.Dog = $scope.dog.id;
    }

    var processInvalidPost = function (response) {
      $scope.weightForm.$invalid = true;
      $scope.weightForm.$dirty = true;
      $scope.weightForm.$submitted = true;

      if(response.invalidAttributes.Weight) {
        $scope.weightForm.weight.$invalid = true;

        var errors = response.invalidAttributes.Weight.map(function (obj) {
          return obj.rule;
        });

        if(errors.indexOf("required") != -1) {
          $scope.weightForm.weight.$error.required = true;
        }
        else if(errors.indexOf("required") != -1) {
          $scope.weightForm.weight.$error.number = true;
        }
      }
    };

    var postComplete = function () {
      $scope.processing = false;
    };

    var reset = function () {
      $scope.processing = false;

      if($scope.weightForm) {
        $scope.weightForm.$submitted = false;
        $scope.weightForm.$dirty = false;
      }

      $scope.newWeight = {
        Weight: null,
        DateTaken: null,
        Dog: null
      };
    };

    init();
  });
