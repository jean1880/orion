'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PersonEditCtrl
 * @description
 * # PersonEditCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonEditFormCtrl', function ($scope, FactoryAddress) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function () {
      $scope.$watch('person', function(person) {
        if(person) {
          loadAddressForPerson(person);
        }
      });
    };

    /**
     * loads the address for the given person if it has not been loaded yet
     *
     * @private
     * @method loadAddressForPerson
     * @param {Person} person The person to load the address for.
     */
    var loadAddressForPerson = function (person) {
      if(typeof person.Address === 'string') {
        FactoryAddress.get(person.Address)
          .success(function (response) {
            person.Address = response;
          });
      }
    };

    $scope.editFormSubmit = function () {
      if($scope.editForm.$valid) {
        if($scope.formSubmit) {
          $scope.formSubmit();
        }
      }
    };

    init();
  });
