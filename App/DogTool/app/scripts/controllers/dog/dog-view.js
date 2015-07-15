'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogViewCtrl
 * @description
 * # DogCtrl
 *
 * Controller for the viewing of a dog based on a id from routeParams
 */
angular.module('dogToolApp')
  .controller('DogViewCtrl', function ($scope, $routeParams, $location, FactoryDog, flash) {
    /**
     * Prepares the controller for use
     *
     * @private
     * @method init
     */
    var init = function() {
      loadDog($routeParams.id);

      $scope.editingInfo    = false;
      $scope.editOwner      = false;
      $scope.editVet        = false;
      $scope.editEmgContact = false;
    };

    /**
     * Loads a given dog from sails
     *
     * If the dog is not found, redirects to the homepage
     *
     * @private
     * @method loadDog
     * @param  {ID} id The id of the dog to load from sails
     */
    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          FactoryDog.processDog(dog);

          $scope.dog = dog;
        })
        .error(function (response, status) {
          switch(status) {
            case 404:
              flash.error = 'Dog not found';
              break;
            default:
              flash.error = 'An error occured';
              break;
          }

          $location.path('/');
        });
    };

    /**
     * Updates the database with a new Owner
     *
     * @method ownerUpdated
     * @param  {ID} newId The ID of the new Owner
     */
    $scope.ownerUpdated = function (newId) {
      updatePerson('Owner', newId);
    };

    /**
     * Updates the database with a new Vet
     *
     * @method vetUpdated
     * @param  {ID} newId The ID of the new Vet
     */
    $scope.vetUpdated = function (newId) {
      updatePerson('Vet', newId);
    };

    /**
     * Updates the database with a new Emergency Contact
     *
     * @method vetUpdated
     * @param  {ID} newId The ID of the new Vet
     */
    $scope.emgContactUpdated = function (newId) {
      updatePerson('EmergencyContact', newId);
    };

    $scope.updateNotes = function () {

      FactoryDog.update($scope.dog)
        .success(function (res) {

        })
        .error(function (res) {

        });
    };

    /**
     * Updates the database with a new person for the given relation
     *
     * @method updatePerson
     * @param  {string} relation The name of the field to update
     * @param  {ID} newId The ID of the new Vet
     */
    var updatePerson = function (relation, newId) {
      var payload = {};
      payload.id = $scope.dog.id;

      //dynamically prepare the payload
      payload[relation] = newId;

      FactoryDog.update(payload)
        .success(function () {
          flash.success = 'Dog updated';
        })
        .error(function () {
          flash.error = 'Error updating dog';
        });
    };

    init();
  });
