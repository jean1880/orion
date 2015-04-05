'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogViewCtrl
 * @description
 * # DogCtrl
 *
 * Controller for the viewing of a dog based on a id from routeParams
 */
angular.module('dogToolApp')
  .controller('DogViewCtrl', function ($scope, $routeParams, $location, FactoryDog) {
    /**
     * Prepares the controller for use
     *
     * @private
     * @method init
     */
    var init = function() {
      loadDog($routeParams.id);

      $scope.editingInfo = false;
    };

    /**
     * Loads a given dog from sails
     *
     * If the dog is not found, redirects to the homepage
     *
     * @private
     * @method loadDog
     * @param  {ID} id The id of the dog to load from sails
     */
    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          processDog(dog);

          $scope.dog = dog;
        })
        .error(function () {
          $location.path('/');
        });
    };

    /**
     * Converts the raw data on the given dog into more manageable objects
     *
     * - birthdate is converted to a Date Object
     * - age is populated from the birthdate
     *
     * @private
     * @method processDog
     * @param  {Dog} dog The dog to update
     */
    var processDog = function (dog) {
      dog.Birthdate = new Date(dog.Birthdate);
      dog.Age = moment(dog.Birthdate).fromNow(true);
    };

    init();
  });
