'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogViewCtrl', function ($scope, $routeParams, $location, FactoryDog, flash) {
    var init = function() {
      loadDog($routeParams.id);

      $scope.editOwner      = false;
      $scope.editVet        = false;
      $scope.editEmgContact = false;
    };

    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          dog.Age = moment(dog.Birthdate).fromNow(true);

          $scope.dog = dog;
        })
        .error(function (response) {
          console.log(response);
          flash.error = 'Dog not found';
          $location.path('/');
        });
    };

    $scope.editBtn = function() {
      $location.path('/dog/' + $scope.dog.id + '/edit');
    };

    $scope.ownerUpdated = function (newId) {
      updatePerson('Owner', newId);
    };

    $scope.vetUpdated = function (newId) {
      updatePerson('Vet', newId);
    };

    $scope.emgContactUpdated = function (newId) {
      updatePerson('EmergencyContact', newId);
    };

    var updatePerson = function (relation, newId) {
      var payload = {};
      payload.id = $scope.dog.id;

      //dynamically prepare the payload
      payload[relation] = newId;

      FactoryDog.update(payload)
        .success(function () {
          flash.success = 'Person updated';
        })
        .error(function () {
          flash.error = 'Error updating person';
        });
    };


    init();
  });
