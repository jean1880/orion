'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:LibraryCtrl
 * @description
 * # LibraryCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('LibraryCtrl', function ($scope, FactoryHomework, FactoryDog, HelperService, $location, flash) {

    /*createDogLookup, re-orders the array into a JSON object propertied by 
     *dog's id.
     *@param dogList, the list of dogs to be striped of the array.
     *
     */
    var createDogLookup = function (dogList) {
        for (var dog in dogList) {
          $scope.dog[dogList[dog].id] = dogList[dog];
          console.log(dog);
        }
      }
      /*createLibraryLookup, re-orders the array into a JSON object propertied 
       * by homework id.
       *@param homeworkList, the list of homework to be striped of the array.
       *
       */
    var createLibraryLookup = function (homeworkList) {
        for (var homework in homeworkList) {
          $scope.LibraryList[homeworkList[homework].id] = homeworkList[homework];
          console.log(homework);
        }
      }
      /**
       *edit function that redirects the user to the homework edit page
       *@param homeworIdToEdit, what homework by id to edit
       */
    $scope.edit = function (homeworkIdToEdit) {
      console.log(homeworkIdToEdit);
      $location.url('/homework/' + homeworkIdToEdit);
    };
    /**
     *deleteHomework function that deletes homework
     *@param homeworIdToDelete, what homework by id to delete
     */
    $scope.deleteHomework = function (homeworIdToDelete) {
      FactoryHomework.remove(homeworIdToDelete)
        .success(function (res) {
          flash.success = "Homework Deleted";
          init();
          $scope.$apply();
        }).error(function (err) {
          flash.error = "Sorry but could not delete the homework"
        });
    };

    var init = function () {
      $scope.dogHomeworkGroup = {};
      $scope.dog = {};
      $scope.LibraryList = {};
      $scope.sortBy = 'dog';
      loadHomework();
    };

    var loadHomework = function () {
        FactoryHomework.getAll().success(function (response) {
          createLibraryLookup(response);
          FactoryDog.getAll()
            .success(function (response) {
              createDogLookup(response);
              parseDogs();
            })
            .error(function () {
              flash.error = 'A error occured while loading dogs.';
            });
        });
      }
      /* parseDogs sorts the homework into a JSON object with the key being a
       * dog's id and the value being the array of homework ids attached to
       * the homework.
       */
    var parseDogs = function () {
      console.log($scope.LibraryList);
      for (var item in $scope.LibraryList) {
        for (var dogPos in $scope.LibraryList[item].Dogs) {
          var dogId = $scope.LibraryList[item].Dogs[dogPos].id;
          console.log(dogId);
          if ($scope.dogHomeworkGroup[dogId] == null) {
            $scope.dogHomeworkGroup[dogId] = [];
          }
          $scope.dogHomeworkGroup[dogId].push($scope.LibraryList[item].id);
        }
      }
      console.log($scope.dogHomeworkGroup);
    };


    $scope.changeSortBy = function (newSort) {
      $scope.sortBy = newSort;
      console.log(newSort);
    };
    init();
  });