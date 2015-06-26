'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('JobsCtrl', function ($scope, $location, FactoryDog, flash, FactoryJob, FactoryJobType, $routeParams, HelperService, $sce, $q) {
    $scope.pageType = 'Edit ';
    $scope.selectedJobType;
    $scope.addedDogUI = [];
    $scope.fullAddress = null;

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
    var getBookingTypes = function () {
      //get the booking types
      FactoryJobType.getAll()
        .success(function (response) {
          //        console.log(response);
          $scope.jobTypes = response;
          loadAllDogs();
        })
        .error(function () {
          flash.error = 'An error occured while loading job types.';
        });
    };
    var loadBookingData = function () {
      //get the specific booking information
      FactoryJob.get($routeParams.id)
        .success(function (res) {
          console.log("Booking Data");
          console.log(res);
          $scope.booking = res;

          $scope.addedDogUI = res.Dogs;
          $scope.dogs = $scope.dogs.filter(removeDuplicate);
          $scope.selectedJobType = res.Jobtype;
          console.log("Dog ID setup");
          console.log($scope.addedDogUI);
          //                $scope.booking.Jobtype = $scope.booking.Jobtype.id;
          $scope.fullAddress = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBVriHiqrpv6aGFnYnFl-pbxThfuPQB3G0&q=" + $scope.booking.Location.Street.split(' ').join('+') + '+' + $scope.booking.Location.City.split(' ').join('+') + '+' + $scope.booking.Location.Province.split(' ').join('+') + '+' + $scope.booking.Location.Country.split(' ').join('+'));
        })
        .error(function () {
          flash.error = 'An error occured. Unable to load booking information';
        });

    };
    var init = function () {
      getBookingTypes();
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
          loadBookingData();
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
      console.log("Booking JobType:");
      console.log($scope.selectedJobType.id);
      $scope.submitted = true;
      if ($scope.booking.Dogs.length > 0) {
        if ($scope.selectedJobType) {
          $scope.booking.Jobtype = {};
          $scope.booking.Jobtype.id = $scope.selectedJobType.id;
        }
        console.log("Booking Obj:");
        console.log($scope.booking);
        $scope.booking.Dogs = HelperService.convert.objectArrayToIdArray($scope.booking.Dogs);
        console.log($scope.booking.Dogs);
        FactoryJob.update($scope.booking).success(function (res) {
            flash.success = 'Job Created.';

            console.log(res);
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
      console.log("Log booking add");
      var dogIn = $scope.dogs[indexIn];
      console.log(dogIn);
      $scope.dogs.splice(indexIn, 1);
      $scope.addedDogUI.push(dogIn);
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
    //notes
    $scope.updateNotes = function () {
      //console.log($scope.booking.Notes);

    };

  });