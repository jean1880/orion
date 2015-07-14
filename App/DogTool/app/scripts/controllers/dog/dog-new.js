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
      $scope.dogEditForm.$setSubmitted(true);

      if(formIsValid()) {
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

    var formIsValid = function () {
      if($scope.dogEditForm.$invalid) { return false; }
      if(!ownerIsValid())             { return false; }
      return true;
    };

    var ownerIsValid = function () {
      return $scope.dog.Owner ? true : false;
    };

    var vetIsValid = function () {
      return $scope.dog.Vet ? true : false;
    };

    init();
  });

