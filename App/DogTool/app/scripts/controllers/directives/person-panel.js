'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DirectivesPersonPanelCtrl
 * @description
 * # DirectivesPersonPanelCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PersonPanelCtrl', function ($scope, FactoryAddress) {
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
     * @param {function()} callback Function to call when the address is loaded
     */
    var loadAddressForPerson = function (person, callback) {
      if(typeof person.Address === 'string') {
        FactoryAddress.get(person.Address)
          .success(function (response) {
            person.Address = response;
          })
          .then(function () {
            if (callback) {
              callback();
            }
          });
      }
      else {
        if (callback) {
          callback();
        }
      }
    };

    init();
  });
