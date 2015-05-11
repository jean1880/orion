'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleViewCtrl
 * @description
 * # PeopleViewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleViewCtrl', function ($scope, $location, FactoryPeople, flash, $routeParams) {
    var init = function() {
      loadPerson($routeParams.id);
    };

    var loadPerson = function (id) {
      FactoryPeople.get(id)
        .success(function (response) {
          $scope.person = response;
        })
        .error(function (response, status) {
          console.log(response);

          switch(status) {
            case 404:
              flash.error = 'Person not found';
              break;
            default:
              flash.error = 'An error occured';
              break;
          }

          $location.path('/');
        });
    };

    init();
  });
