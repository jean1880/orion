'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:NewjobsCtrl
 * @description 
 * # NewjobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('NewJobsCtrl', function ($scope, $location, FactoryDog, flash, FactoryJob) {
  
  var now =new Date();
  $scope.booking={Name:'',Dogs:[],Costs:[],Notes:[],Invoice:[],JobType:{Name:'Day Care',Description:'test'},Location:[],Calendars:{StartDate: now, EndDate: now}};  
  
  var init = function() {
      loadAllDogs();
    };

  // setup the datepicker directives
  
  $scope.dateOptions = {
    startingDay: 1,
    showWeeks: false
  };
  
  $scope.hourStep = 1;
  $scope.minuteStep = 1;

  $scope.timeOptions = {
    hourStep: [1, 2, 3],
    minuteStep: [1, 5, 10, 15, 25, 30]
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
          flash.error = 'An error occured while loading dogs.';
        });
    };
    
    init();
  
 
    /**
     * @method createBooking
     * @description creates the new booking through FactoryJob via post
     */
     $scope.createBooking = function()
    {
      FactoryJob.post($scope.booking).success(function(res){
        flash.success = 'Job Created.';
        
        console.log(res);
      })
      .error(function(err){
        console.log(err);
        flash.error='An error occured while creating a new Job. Sorry but this job was not created.';
      });
    }
    
    /**
     * @method bookDog
     * @description Adds dogs to the booking list and removes the dogs from the search list (dogs avaliable to be added)
     * 
     */
    $scope.bookDog = function(indexIn)
    {
      console.log($scope.booking);
      var dogIn = $scope.dogs[indexIn];
      console.log(dogIn);
      $scope.dogs.splice(indexIn,1);
      $scope.booking.Dogs.push(dogIn);
    }
    /**
     * @method removeDog
     * @description Removes dogs from the booking and pushes them back to the search list.
     * 
     */
    $scope.removeDog = function(indexOut)
    {
      var dogOut = $scope.booking.Dogs[indexOut];
      console.log(dogOut);
      $scope.booking.Dogs.splice(indexOut,1);
      $scope.dogs.push(dogOut);
    }
    /**
     * @method addFee
     * @description Adds a list of fees to the job
     * 
     */
    $scope.addFee=function()
    {
      if($scope.feeDescription!='' && $scope.feeAmount!= null){
        var newCost={Date:new Date(),Description:$scope.feeDescription,Cost:$scope.feeAmount};
        console.log(newCost);
        $scope.booking.Costs.push(newCost);
      }
      else
      {
        if($scope.feeDescription==''){
          flash.error='Please enter a description';
        }
        if($scope.feeAmount==null)
        {
          flash.error='Please enter a fee amount in proper currency';
        }
      }
    }
  });
