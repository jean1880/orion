'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PersonSelectCreateCtrl
 * @description
 * # DirectivesPersonSelectCreateCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonSelectCreateCtrl', function ($scope, FactoryPeople) {
    var init = function () {
      reset();

      loadAllPeople();

      $scope.$watch('selectedId', function (newValue) {
        console.log($scope.name + ': ' + newValue);
      });

      //when edit mode on parent controller ends, reset
      $scope.$on('editMode.disabled', reset);
    };

    $scope.selectFormSubmit = function () {
      $scope.onNewPersonId($scope.selectedId);
    };

    $scope.createFormSubmit = function () {

    };

    var reset = function () {
      $scope.mode = '';
    };

    var loadAllPeople = function () {
      FactoryPeople.getAll()
        .success(function (response) {
          $scope.people = response;
        });
    };


    init();
  });
