'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleViewCtrl
 * @description
 * # PeopleViewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleViewCtrl', function ($scope, $location, FactoryPeople, flash, $routeParams, FactoryDog) {
    var init = function() {
      loadPerson($routeParams.id);
    };

    var loadPerson = function (id) {
      FactoryPeople.get(id)
        .success(function (response) {
          $scope.person = response;
          loadDogsForPerson($scope.person);
        })
        .error(function (response, status) {
          switch(status) {
            case 404:
              flash.error = 'Person not found';
              break;
            default:
              flash.error = 'An error occured';
              break;
          }

          $location.path('/people');
        });
    };

    var loadDogsForPerson = function (person) {
      FactoryDog.find({ Owner: person.id })
        .success(function (res) {
          person.Dogs = res;
        })
        .error(function () {
          flash.error = 'An error occured loading dog info';
        });
    };

    /**
     * handler for the edit button
     *
     * Switches the panel into editing mode when called.
     *
     * @method editInfoBtn
     */
    $scope.editInfoBtn = function() {
      $scope.editedPerson = angular.copy($scope.person);
      $scope.editingInfo = true;
    };

    /**
     * handler for the cancel button
     *
     * Reverts all changes to the dog, and return the panel to viewing mode
     *
     * @method cancelInfoBtn
     */
    $scope.cancelInfoBtn = function() {
      $scope.editingInfo = false;
    };

    $scope.updateNotes = function () {
      FactoryPeople.update($scope.person);
    };

    /**
     * handler for the save button
     *
     * if the form is valid, saves changes to the database, and return the panel
     * to viewing mode
     *
     * @method saveInfoBtn
     */
    $scope.editInfoSubmit = function() {
      FactoryPeople.update($scope.editedPerson)
        .success(function (response) {
          $scope.person = response;
          $scope.editingInfo = false;
        })
        .error(function () {
          flash.error = 'An error occured';
        });
    };

    init();
  });
