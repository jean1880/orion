(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name dogToolApp.controller:NewjobsCtrl
   * @description
   * # NewjobsCtrl
   * Controller of the dogToolApp
   */
  angular.module('dogToolApp')
    .controller('NewJobsCtrl', function ($scope, $location, FactoryDog,
      flash, FactoryJob, FactoryJobType, FactoryBehaviourFlag,
      $window, $rootScope, HelperService,
      $routeParams) {

      $scope.pageType = "Create ";
      $scope.pagination = {
        currentPage: 1,
        limit: 9
      }
      $scope.selectedJobType;
      $scope.addedDogUI = [];
      $scope.submitted = false;

      /**
       * Rounds the date to the bottom, or top of the hour
       * @param  {object} date new date object
       * @return {object}      Modified date object
       */
      var roundHour = function (date, topOfTheHour) {
        date.setSeconds(0);
        date.setMinutes(0);
        if (topOfTheHour) {
          date.setHours(date.getHours() + 1);
        }

        return date;
      };

      var LoadDate = function () {
        if ($routeParams.startDate && $routeParams.endDate) {
          $scope.booking.Calendars.StartDate = new Date(decodeURI($routeParams.startDate));

          if ($routeParams.allDay) {
            $scope.booking.Calendars.IsAllDay = $routeParams.allDay;
            $scope.booking.Calendars.EndDate = new Date(decodeURI($routeParams.startDate));
            $scope.booking.Calendars.EndDate.setHours($scope.booking.Calendars.StartDate.getHours() + 12);
          } else {
            $scope.booking.Calendars.EndDate = new Date(decodeURI($routeParams.endDate));
          }
        } else {
          $scope.booking.Calendars.StartDate = new Date();
          $scope.booking.Calendars.EndDate = new Date();
          $scope.booking.Calendars.StartDate = roundHour($scope.booking.Calendars.StartDate);
          $scope.booking.Calendars.EndDate = roundHour($scope.booking.Calendars.EndDate, true);
        }
      };

      var init = function () {
        $scope.feeAmount;
        $scope.feeDescription;
        $scope.booking = {
          Name: '',
          Dogs: [],
          Costs: [],
          Notes: [],
          Invoice: [],
          Jobtype: {
            id: null
          },
          Location: {},
          Calendars: {
            StartDate: null,
            EndDate: null
          }
        };

        FactoryBehaviourFlag.getAll()
          .success(function (res) {
            $scope.colours = res;
          });
        LoadDate();
        loadAllDogs();
      };

      /**
       * @method removeDuplicate
       * @return return the bool of if obj is in doglistArray
       * @param obj, what you are looking for, must be type dog.
       *
       */
      var removeDuplicate = function (obj) {
        var doglistArray = HelperService.convert.objectArrayToIdArray($scope.booking.Dogs);
        return (doglistArray.indexOf(obj.id) == -1);
      };
      // setup the datepicker directives

      $scope.dateOptions = {
        startingDay: 1,
        showWeeks: false
      };

      $scope.ismeridian = true;
      $scope.hourStep = 1;
      $scope.minuteStep = 15;

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
                $scope.jobTypes = response;
              })
              .error(function () {
                flash.error = 'An error occured while loading job types.';
              });
            if ($rootScope.bookingLog != null && $rootScope.bookingLog.id == null) {
              $scope.booking = $rootScope.bookingLog;
              LoadDate();
              $scope.dogs = $scope.dogs.filter(removeDuplicate);
            } else {
              $rootScope.bookingLog = {};
              $rootScope.bookingLog = $scope.booking;
            }

            //          $scope.addedDogUI = $scope.booking.Dogs;
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
        if ($scope.addedDogUI.length > 0) {
          $scope.booking.Dogs = HelperService.convert.objectArrayToIdArray($scope.addedDogUI);
          FactoryJob.post($scope.booking).success(function (res) {
              flash.success = 'Job Created.';
              $window.location.href = "#/jobs/" + res.id;
            })
            .error(function (err) {
              flash.error = 'An error occured while creating a new Job. Sorry but this job was not created.';
            });
        }
      };

      /**
       * @method bookDog
       * @description Adds dogs to the booking list and removes the dogs from the search list (dogs avaliable to be added)
       *
       */
      $scope.bookDog = function (dogIn) {
        var indexIn = $scope.dogs.indexOf(dogIn);

        $scope.addedDogUI.push(dogIn);
        $scope.dogs.splice(indexIn, 1);
      };
      /**
       * @method removeDog
       * @description Removes dogs from the booking and pushes them back to the search list.
       *
       */
      $scope.removeDog = function (dogOut) {

        var indexOut = $scope.addedDogUI.indexOf(dogOut);

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
}());