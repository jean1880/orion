'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogNewCtrl
 * @description
 * # DogNewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogNewCtrl', function ($scope, FactoryDog, flash, $location) {
    /**
     * Initalizes the controller for use
     *
     * @private
     * @method init
     */
    var init = function () {
      $scope.saveBtnText = 'Create';
      $scope.dog = {};
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
        FactoryDog.post($scope.dog)
          .success(function (response) {
            flash.success = 'Dog Created';
            $location.path('/dog/' + response.id);
          })
          .error(function () {
            flash.error = 'Error saving dog';
          });
      }
    };

    init();
  });
