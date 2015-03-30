'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleNewCtrl
 * @description
 * # PeopleNewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleNewCtrl', function ($scope, FactoryPeople, FactoryAddress, flash, $location) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function () {
      $scope.person = {
        Address: {}
      };
    };

    /**
     * save button handler for the form
     *
     * If the form is valid, saves the new dog to the database, and redirects
     * to the view page for the new dog.
     *
     * @method saveBtn
     **/
    $scope.submitForm = function() {
      if($scope.newPersonForm.$valid) {
        savePerson();
      }
    };

    var savePerson = function () {
      FactoryPeople.post($scope.person)
        .success(processPersonSuccess)
        .error(processPersonError);
    };

    var processPersonSuccess = function (response) {
      flash.success = 'Person Created';
      $location.path('/person/' + response.id);
    };

    var processPersonError = function (response) {
      flash.error = 'Error saving person';
      console.log('Error saving person: ' + JSON.stringify(response));
    };

    init();
  });
