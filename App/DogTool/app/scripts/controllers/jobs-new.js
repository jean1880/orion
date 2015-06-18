'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:NewjobsCtrl
 * @description 
 * # NewjobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('NewJobsCtrl', function ($scope, $location, FactoryDog, flash) {
  $scope.bookingDogs=[];
  var init = function() {
      loadAllDogs();
    };
    /**
     * @method loadAllDogs
     * @return loads the dogs into a list var of scope 
     * dogs
     * @description links to dog factory "FactoryDog" to 
     * get the dog list
     * 
     */
    var loadAllDogs = function () {
      $scope.dogs = null;

      FactoryDog.getAll()
        .success(function (response) {
          $scope.dogs = response;
        })
        .error(function () {
          flash.error = 'A error occured while loading dogs.';
        });
    };
    /**
     * @method loadAllDogs
     * @description creates the new booking
     * @returns an object with two keys. responseCode and msg.
     * @returns responseCode, if 200 sucess else different errors.
     * @returns msg, is a generica user message.
     */
    init();
     $scope.createBooking = function()
    {
      
    }
    
    /**
     * @method loadAllDogs
     * @return loads the dogs into a list var of scope 
     * dogs
     * @description links to dog factory "FactoryDog" to 
     * get the dog list
     * 
     */
    $scope.bookDog = function(dog)
    {
      console.log("summoned");
      $scope.bookingDogs.push(dog);
    }
    
  });
