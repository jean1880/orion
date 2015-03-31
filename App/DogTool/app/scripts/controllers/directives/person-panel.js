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
    var init = function () {
      $scope.$watch('person', function(person) {
        if(person) {
          loadAddressForPerson(person);
        }
      });
    };

    var loadAddressForPerson = function (person) {
      if(typeof person.Address === 'string') {
        FactoryAddress.get(person.Address)
          .success(function (response) {
            person.Address = response;
          })
          .error(function () {});
      }
    };

    init();
  });
