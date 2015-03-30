'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogEditCtrl', function ($scope, $routeParams, $location, FactoryDog, flash) {

    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function() {
      loadDog($routeParams.id);

      $scope.saveBtnText = 'Save Changes';
    };

    /**
     * loads the dog with the given id into the scope
     *
     * @private
     * @method loadDog
     * @param {ID} id The id of the dog to load
     */
    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          dog.Birthdate = new Date(dog.Birthdate);

          $scope.dog = dog;
        })
        .error(function () {
          $location.path('/');
        });
    };

    /**
     * save button handler for the form
     *
     * If the form is valid, saves the new dog to the database, and redirects
     * to the view page for the new dog.
     *
     * @method saveBtn
     **/
    $scope.saveBtn = function() {
      if($scope.dogEditForm.$valid) {
        FactoryDog.update($scope.dog)
          .success(function (response) {
            flash.success = 'Changes Saved';
            $location.path('/dog/' + response.id);
          })
          .error(function () {
            flash.error = 'Error saving dog';
          });
      }
    };

    init();
  });
