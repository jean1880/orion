(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name dogToolApp.controller:JobsCtrl
   * @description
   * # JobsCtrl
   * Controller of the dogToolApp
   */
  angular.module('dogToolApp')
    .controller('JobsEditCtrl', function (
      $scope,
      $location,
      FactoryDog,
      flash,
      FactoryJob,
      FactoryInvoice,
      FactoryJobType,
      factoryCalendar,
      FactoryAddress,
      FactoryNote,
      FactoryBehaviourFlag,
      $routeParams,
      HelperService,
      $sce,
      $modal,
      $q) {
      $scope.pageType = 'Update ';
      $scope.pagination = {
        currentPage: 1,
        limit: 9
      }
      $scope.selectedJobType;
      $scope.addedDogUI = [];
      $scope.fullAddress = null;
      $scope.submitted = false;
      var now = new Date();


      var getBookingTypes = function () {
        //get the booking types
        FactoryJobType.getAll()
          .success(function (response) {
            $scope.jobTypes = response;
          })
          .error(function () {
            flash.error = 'An error occured while loading job types.';
          });
      };
      var loadBookingData = function () {
        //get the specific booking information
        FactoryJob.get($routeParams.id)
          .success(function (res) {

            console.log(res);
            $scope.booking = res;
            $scope.booking.Calendars.EndDate = new Date($scope.booking.Calendars.EndDate);
            $scope.booking.Calendars.StartDate = new Date($scope.booking.Calendars.StartDate);
            $scope.isUpdated = true;

            // match dogs to fetched dogs, with full info
            for (var i = res.Dogs.length - 1; i >= 0; i--) {
              $scope.addedDogUI.push(findDoginDogs(res.Dogs[i]));
            }
            $scope.dogs = $scope.dogs.filter(removeDuplicate);
            $scope.selectedJobType = res.Jobtype;

            var GoogleMapsUrl = 'https://www.google.com/maps/embed/v1/place';
            var GoogleMapsKey = 'AIzaSyBVriHiqrpv6aGFnYnFl-pbxThfuPQB3G0';

            var location = [
            $scope.booking.Location.Street,
            $scope.booking.Location.City,
            $scope.booking.Location.Province,
            $scope.booking.Location.Country
          ];

            var locationParam = location.join('+').replace(' ', '+');

            $scope.fullAddress = $sce.trustAsResourceUrl(
              GoogleMapsUrl +
              '?key=' + GoogleMapsKey +
              '&q=' + locationParam
            );
          })
          .error(function () {
            flash.error = 'An error occured. Unable to load booking information';
          });

      };

      /**
       * Parses through all loaded dogs, and matches the dog to a dog data set, to fill inmissing data
       * @method findDoginDogs
       * @param {object} dog The dog to search for
       */
      var findDoginDogs = function (dog) {
        for (var i = $scope.dogs.length - 1; i >= 0; i--) {
          if ($scope.dogs[i].id === dog.id) {
            return $scope.dogs[i];
          }
        }
      };

      var init = function () {
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

        FactoryBehaviourFlag.getAll()
          .success(function (res) {
            $scope.colours = res;
          });
        getBookingTypes();
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
        $scope.submitted = true;
        if ($scope.booking.Dogs && $scope.booking.Dogs.length > 0) {
          if ($scope.selectedJobType) {
            $scope.booking.Jobtype = $scope.selectedJobType.id;
          }


          $scope.booking.Dogs = HelperService.convert.objectArrayToIdArray($scope.booking.Dogs);

          FactoryJob.update($scope.booking).then(function (err, data) {
            if (!err) {
              flash.success = "Job created"

            } else {
              flash.error = "Something went wrong"
            }
          });
        }
      };

      /**
       * @method bookDog
       * @description Adds dogs to the booking list and removes the dogs from the search list (dogs avaliable to be added)
       *
       */
      $scope.bookDog = function (indexIn) {

        var dogIn = $scope.dogs[indexIn];

        $scope.dogs.splice(indexIn, 1);
        $scope.addedDogUI.push(dogIn);
      };
      /**
       * @method removeDog
       * @description Removes dogs from the booking and pushes them back to the search list.
       *
       */
      $scope.removeDog = function (indexOut) {
        var dogOut = $scope.addedDogUI[indexOut];
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
            flash.error = 'Please enter a fee with only numbers, and no letters or symbols';
          }
        }
      };
      //notes
      $scope.updateNotes = function () {
        //

      };

      /**
       * Confirms with the user to delete the booking, if the userconfirms the action
       * call the ClearAllBookingData function, which clears all of the associated data with the
       * model before deleting the model itself
       */
      $scope.ConfirmDelete = function () {
        var modal = $modal.open({
          templateUrl: 'app/Booking/modal/confirm-delete.html',
          controller: 'confirmBookingDeleteModalCtrl',
          size: 'sm',
          animation: true,
          resolve: {}
        });

        modal.result.then(function success() {
          ClearAllBookingData();
        });
      };

      var ClearAllBookingData = function () {
        DestroyInvoice();
        DestroyCalendar();
        DestroyNotes();
        DestroyLocation();
        DestroyBooking();
      };

      var DestroyNotes = function () {
        if ($scope.booking.Notes && $scope.booking.Notes.length > 0) {
          for (var i = $scope.booking.Notes.length - 1; i >= 0; i--) {
            FactoryNote.destroy($scope.booking.Notes[i]);
          }
        }
      };

      var DestroyLocation = function () {
        if ($scope.booking.Location) {
          FactoryAddress.remove($scope.booking.Location.id);
        }
      };

      var DestroyCalendar = function () {
        if ($scope.booking.Calendars) {
          factoryCalendar.remove($scope.booking.Calendars.id);
        }
      };

      var DestroyInvoice = function () {
        if ($scope.booking.Invoice) {
          // destroy invoice
          FactoryInvoice.remove($scope.booking.Invoice.id);
        }
      };

      var DestroyBooking = function () {
        FactoryJob.remove($scope.booking.id)
          .success(function () {
            flash.success = 'Successfully removed the booking';
            $location.url('/');
          })
          .error(function () {
            flash.error = 'Failed.';
          });
      };

    });
}());