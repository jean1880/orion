'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogInfoPanelCtrl
 * @description
 * # DogInfoPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogInfoPanelCtrl', function ($scope, FactoryDog, flash) {
    /**
     * handler for the edit button
     *
     * Switches the panel into editing mode when called.
     *
     * @method editInfoBtn
     */
    $scope.editInfoBtn = function() {
      $scope.editingInfo = true;
      $scope.editedDog = angular.copy($scope.dog);
      $scope.infoForm.$setDirty(false);
    };

    /**
     * handler for the save button
     *
     * if the form is valid, saves changes to the database, and return the panel
     * to viewing mode
     *
     * @method saveInfoBtn
     */
    $scope.saveInfoBtn = function() {
      if($scope.infoForm.$valid) {
        if($scope.infoForm.$dirty) {
          updateDog($scope.editedDog);
        }
        else {
          $scope.editingInfo = false;
        }
      }
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

    /**
     * Processes the raw dog that is returned by the server by making the
     * birthdate a date object, and sets the age of the dog
     *
     * @private
     * @method processDog
     */
    var processDog = function (dog) {
      dog.Birthdate = new Date(dog.Birthdate);
      dog.Age = moment(dog.Birthdate).fromNow(true);
    };

    /**
     * Updates the given dog in the database
     *
     * @private
     * @method updateDog
     * @param {Dog} dog The dog to update
     */
    var updateDog = function (dog) {
      FactoryDog.update(dog)
        .success(function (response) {
          processSuccess(response);
        })
        .error(function (response) {
          processError(response);
        });
    };

    /**
     * Processes a successful response from the server
     *
     * updates the dog on the scope with the new data from the response
     *
     * @private
     * @method processSuccess
     * @param {Sails.response} response The response from the server containing
     *   the new dog data
     */
    var processSuccess = function (response) {
        processDog(response);

        $scope.dog = response;
        $scope.editingInfo = false;
        $scope.infoForm.$setDirty(false);
    };

    /**
     * Processes a failed response from the server
     *
     * @private
     * @method processError
     * @param {Sails.response} response The response from the server containing
     *   the reason the request failed
     */
    var processError = function () {
        flash.error = 'An error occured';
    };
});
