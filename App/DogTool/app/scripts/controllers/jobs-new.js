'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:NewjobsCtrl
 * @description
 * # NewjobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('NewJobsCtrl', function ($scope, $location, FactoryDog, flash, FactoryJob, FactoryJobType, $window, $rootScope, HelperService) {

    $scope.pageType = "Create ";
    $scope.selectedJobType;
    $scope.addedDogUI = [];
    var now = new Date();
    $scope.booking = {
      Name: '',
      Dogs: [],
      Costs: [],
      Notes: [],
      Invoice: [],
      Jobtype: {
        id: null
      },
      Location: {
        Street: ' ',
        City: ' '
      },
      Calendars: {
        StartDate: now,
        EndDate: now,
        IsAllDay: false
      }
    };
    $scope.submitted = false;

    var init = function () {
      loadAllDogs();
    };

    /**
     * @method removeDuplicate
     * @return return the bool of if obj is in doglistArray
     * @param obj, what you are looking for, must be type dog.
     *
     */
    var removeDuplicate = function (obj) {
      console.log(obj);
      console.log($scope.addedDogUI);
      var doglistArray = HelperService.convert.objectArrayToIdArray($scope.booking.Dogs);
      return (doglistArray.indexOf(obj.id) == -1);
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
          FactoryJobType.getAll()
            .success(function (response) {
              console.log(response);
              $scope.jobTypes = response;
            })
            .error(function () {
              flash.error = 'An error occured while loading job types.';
            });

          if ($rootScope.bookingLog != null && $rootScope.bookingLog.id == null) {
            $scope.booking = $rootScope.bookingLog;
            $scope.addedDogUI = $scope.booking.Dogs;
          } else {
            $rootScope.bookingLog = $scope.booking;
          }
          $scope.dogs = $scope.dogs.filter(removeDuplicate);
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
    $scope.createBooking = function () {
      if ($scope.selectedJobType) {
        $scope.booking.Jobtype.id = $scope.selectedJobType.id;
      }
      $scope.submitted = true;
      if ($scope.booking.Dogs.length > 0) {
        $scope.booking.Dogs = HelperService.convert.objectArrayToIdArray($scope.booking.Dogs);
        FactoryJob.post($scope.booking).success(function (res) {
            flash.success = 'Job Created.';
            $window.location.href = "#/jobs/" + res.id;
          })
          .error(function (err) {
            console.log(err);
            flash.error = 'An error occured while creating a new Job. Sorry but this job was not created.';
          });
      }
    };
    /**
     * @method bookDog
     * @description Adds dogs to the booking list and removes the dogs from the search list (dogs avaliable to be added)
     *
     */
    $scope.bookDog = function (indexIn) {
      console.log("Log booking");
      console.log($scope.booking);
      var dogIn = $scope.dogs[indexIn];
      console.log(dogIn);
      $scope.dogs.splice(indexIn, 1);
      $scope.addedDogUI.push(dogIn);
      $scope.booking.Dogs.push(dogIn);
    };
    /**
     * @method removeDog
     * @description Removes dogs from the booking and pushes them back to the search list.
     *
     */
    $scope.removeDog = function (indexOut) {
      console.log("Log booking remove");
      var dogOut = $scope.addedDogUI[indexOut];
      console.log(dogOut);
      $scope.dogs.push(dogOut);
      $scope.booking.Dogs.splice(indexOut, 1);
      $scope.addedDogUI.splice(indexOut, 1);
    };
    /**
     * @method addFee
     * @description Adds a list of fees to the job
     *
     */
    $scope.addFee = function () {
      if ($scope.feeDescription != '' && $scope.feeAmount != null) {
        var newCost = {
          Date: new Date(),
          Description: $scope.feeDescription,
          Cost: $scope.feeAmount
        };
        console.log(newCost);
        $scope.booking.Costs.push(newCost);
      } else {
        if ($scope.feeDescription == '') {
          flash.error = 'Please enter a description';
        }
        if ($scope.feeAmount == null) {
          flash.error = 'Please enter a fee amount in proper currency';
        }
      }
    };
  });