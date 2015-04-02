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

      //when edit mode on parent controller ends, reset
      $scope.$on('editMode.disabled', reset);
    };

    $scope.selectFormSubmit = function () {
      if($scope.selectForm.$valid) {
        callPersonIdChanged();
      }
    };

    $scope.createFormSubmit = function () {
      if($scope.createForm.$valid) {
        FactoryPeople.post($scope.newPerson)
          .success(function (response) {
            $scope.people.push(response);
            $scope.selectedId = response.id;
            $scope.newPerson = {};

            callPersonIdChanged();
          })
          .error(function (response) {
            console.log(response);
          });
      }
    };

    var callPersonIdChanged = function () {
      if($scope.personIdChanged) {
        $scope.personIdChanged($scope.selectedId);
      }
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
