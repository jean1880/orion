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
        savePerson($scope.person);
      }
    };

    /**
     * saves the given person to the sails database
     *
     * @private
     * @method savePerson
     * @param {Person} person The person to save
     **/
    var savePerson = function (person) {
      FactoryPeople.post(person)
        .success(processSuccess)
        .error(processError);
    };

    /**
     * handles a successful response from sails after saving the person
     *
     * Redirects the user to the view page for the newly created person
     *
     * @private
     * @method processSuccess
     * @param {Sails.response} response The successful response from sails
     **/
    var processSuccess = function (response) {
      flash.success = 'Person Created';
      $location.path('/person/' + response.id);
    };

    /**
     * handles a failed response from sails after saving the person
     *
     * @private
     * @method processError
     * @param {Sails.response} response The error response from sails
     **/
    var processError = function (response) {
      flash.error = 'Error saving person';
      console.log('Error saving person: ' + JSON.stringify(response));
    };

    init();
  });
