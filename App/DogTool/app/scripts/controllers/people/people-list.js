'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('PeopleListCtrl', function ($scope, FactoryPeople, flash) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function() {
      loadAllPeople();
    };

    /**
     * Loads all people from sails into the scope
     *
     * @private
     * @method loadAllPeople
     */
    var loadAllPeople = function () {
      $scope.people = null;

      FactoryPeople.getAll()
        .success(function (response) {
          $scope.people = response;
        })
        .error(function () {
          flash.error = 'A error occured while loading people.';
        });
    };

    init();
  });
