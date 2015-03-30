'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleIdCtrl
 * @description
 * # PeopleIdCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleViewCtrl', function ($scope, FactoryPeople, $location, $routeParams) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function() {
      loadPerson($routeParams.id);
    };

    /**
     * Loads a person from sails into the scope
     *
     * Redirects the user to the home page if the person does not exist
     *
     * @private
     * @method loadPerson
     * @param {ID} id The id of the person to load
     */
    var loadPerson = function (id) {
      FactoryPeople.get(id)
        .success(function (response) {
          $scope.person = response;
        })
        .error(function () {
          $location.path('/');
        });
    };

    init();
  });
