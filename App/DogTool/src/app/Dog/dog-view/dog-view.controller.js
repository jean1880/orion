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
  .controller('DogViewCtrl', function($scope, $stateParams, $window, $location, FactoryDog, flash, FactoryNote, $modal) {

    loadDog($stateParams.id);
    $scope.editingInfo = false;
    $scope.editOwner = false;
    $scope.editVet = false;
    $scope.editEmgContact = false;
    $scope.pagination = {};
    $scope.pagination.limit = 10;
    $scope.pagination.currentPage = 1;

    /******** Public Functions ********/
    $scope.print = print;
    $scope.ownerUpdated = ownerUpdated;
    $scope.vetUpdated = vetUpdated;

    /**
     * Loads a given dog from sails
     *
     * If the dog is not found, redirects to the homepage
     *
     * @private
     * @method loadDog
     * @param  {ID} id The id of the dog to load from sails
     */
    function loadDog(id) {
      FactoryDog.get(id)
        .then(function(response) {
          var dog = response;

          FactoryDog.processDog(dog);

          $scope.dog = dog;
        })
        .catch(function(response, status) {
          switch (status) {
            case 404:
              flash.error = 'Dog not found';
              break;
            default:
              flash.error = 'An error occured';
              break;
          }
        });
    };

    /**
     * Updates the database with a new Owner
     *
     * @method ownerUpdated
     * @param  {ID} newId The ID of the new Owner
     */
    function ownerUpdated (newId) {
      updatePerson('Owner', newId);
    };

    /**
     * Updates the database with a new Vet
     *
     * @method vetUpdated
     * @param  {ID} newId The ID of the new Vet
     */
    function vetUpdated (newId) {
      updatePerson('Vet', newId);
    };

    /**
     * Updates the database with a new Emergency Contact
     *
     * @method vetUpdated
     * @param  {ID} newId The ID of the new Vet
     */
    $scope.emgContactUpdated = function(newId) {
      updatePerson('EmergencyContact', newId);
    };

    $scope.updateNotes = function() {
      var payload = {
        id: $scope.dog.id,
        Notes: $scope.dog.Notes
      };

      FactoryDog.update(payload)
        .then(function(res) {
          $scope.dog = res;
          flash.success = 'Notes saved';
        })
        .catch(function() {
          flash.error = 'An error occured while saving notes.';
        });
    };

    /**
     * Updates the database with a new person for the given relation
     *
     * @method updatePerson
     * @param  {string} relation The name of the field to update
     * @param  {ID} newId The ID of the new Vet
     */
    var updatePerson = function(relation, newId) {
      var payload = {
        id: $scope.dog.id
      };

      //dynamically prepare the payload
      payload[relation] = newId;

      FactoryDog.update(payload)
        .then(function() {
          flash.success = 'Dog updated';
        })
        .catch(function() {
          flash.error = 'Error updating dog';
        });
    };

    function print(){
      $window.print();
    }

  });
