'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:LibraryCtrl
 * @description
 * # LibraryCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('HomeworkMngCtrl', function ($scope, FactoryHomework, FactoryDog, HelperService, $location, flash, $stateParams) {
    $scope.pagination = {
      currentPage: 1,
      limit: 3
    };
    /**
     * createDogLookup, re-orders the array into a JSON object propertied by
     * dog's id.
     * @param dogList, the list of dogs to be striped of the array.
     *
     */
    var createDogLookup = function (dogList, callback) {
        async.each(dogList, function (dog, cb) {
          $scope.dog[dog.id] = dog;
          cb();
        }, callback)
      }
      /**
       * createLibraryLookup, re-orders the array into a JSON object propertied
       * by homework id.
       * @param homeworkList, the list of homework to be striped of the array.
       *
       */
    var createLibraryLookup = function (homeworkList) {
        async.each(homeworkList, function (homework, cb) {
          $scope.LibraryList[homework.id] = homework;
          cb();
        }, function () {
          // built
        })
      }
      /**
       * edit function that redirects the user to the homework edit page
       * @param homeworIdToEdit, what homework by id to edit
       */
    $scope.edit = function (homeworkIdToEdit) {
      $location.url('/homework/' + homeworkIdToEdit);
    };

    $scope.duplicateHomework = function (homeworkIdToDuplicate) {
        $location.url('/homework/new/' + homeworkIdToDuplicate);
      }
      /**
       *deleteHomework function that deletes homework
       *@param homeworIdToDelete, what homework by id to delete
       */
    $scope.deleteHomework = function (homeworIdToDelete) {
      FactoryHomework.remove(homeworIdToDelete)
        .success(function (res) {
          flash.success = "Homework Deleted";
          $scope.dogHomeworkGroup = {};
          $scope.dog = {};
          $scope.LibraryList = {};
          loadHomework();
          $scope.$apply();
        })
        .error(function (err) {
          flash.error = "Sorry but could not delete the homework";
        });
    };

    var init = function () {
      $scope.searchDog = $stateParams.dog; //if dog name entered then populate the search bar
      $scope.dogHomeworkGroup = {};
      $scope.dog = {};
      $scope.LibraryList = {};
      $scope.sortBy = 'Dog.Name';
      loadHomework();
    };

    /**
     *updateHomework function that updates homework
     *@param homeworkId, what homework by id to update
     */
    $scope.updateHomework = function (homeworkId) {
      FactoryHomework.update($scope.LibraryList[homeworkId])
        .success(function (homeworkRes) {
          flash.success = "Status Saved";
        })
        .error(function (errorHomework) {
          flash.error = "Sorry there was an issue saving the status change";
        })
    }

    var loadHomework = function () {
        FactoryHomework.getAll()
          .success(function (response) {
            createLibraryLookup(response);
            FactoryDog.getAllNoPopulate()
              .success(function (response) {
                createDogLookup(response, parseDogs);
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
      var listDogHomeworkGroup = {};
      async.each($scope.LibraryList, function (item, cb) {
          async.each(item.Dogs, function(dog,callback){
              listDogHomeworkGroup[dog.id] = {
                homeworkList: [],
                dogName: dog.Name,
                id: dog.id
              };
              listDogHomeworkGroup[dog.id]['homeworkList'].push({
                  id: item.id,
                  EndDate: item.EndDate
              });
              callback();
          }, function(){
              cb();
          });
      }, function () {
        $scope.homeworkByTitle = [];
        async.each($scope.LibraryList, function (value, cb) {
          $scope.homeworkByTitle.push(value);
          cb();
        }, function () {
          // done
        });
      })
    };


    $scope.changeSortBy = function (newSort) {
      $scope.pagination.currentPage = 1;
      $scope.sortBy = newSort;
    };


    init();
  });
