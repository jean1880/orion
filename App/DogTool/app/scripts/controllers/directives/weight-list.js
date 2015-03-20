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
    };

    var processInvalidPost = function (response) {
      var form = $scope.weightForm;

      form.$invalid = true;
      form.$dirty = true;
      form.$submitted = true;

      if(response.invalidAttributes) {
        console.log(response);

        for(var attribute in response.invalidAttributes) {
          console.log(form[attribute]);

          if(!form[attribute]) {
            form[attribute] = {};
          }

          form[attribute].$invalid = true;

          var errors = response.invalidAttributes[attribute].map(function (obj) {
            return obj.rule;
          });

          if(!form[attribute].$error) {
            form[attribute].$error = {};
          }

          if(errors.indexOf('required') !== -1) {
            form[attribute].$error.required = true;
          }
          else if(errors.indexOf('float') !== -1) {
            form[attribute].$error.number = true;
          }
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
