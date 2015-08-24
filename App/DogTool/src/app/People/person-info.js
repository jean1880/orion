'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DirectivesPersonPanelCtrl
 * @description
 * # DirectivesPersonPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonInfoCtrl', function ($scope, FactoryAddress) {
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

    init();
  });
