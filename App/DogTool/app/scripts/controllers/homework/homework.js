'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:HomeworkCtrl
 * @description
 * # HomeworkCtrl
 * Controller of the dogToolApp, manages the homework.html, designed to gather data of specific homework via homework ids.
 */
angular.module('dogToolApp')
  .controller('HomeworkCtrl', function ($scope, $location, FactoryDog, FactoryHomework, flash, $rootScope, HelperService, $routeParams) {
    $scope.hstep = 1;
    $scope.mstep = 10;
    $scope.ismeridian = true;
    $scope.addedDogUI = [];

    var init = function () {
      loadAllDogs();
    };

    $scope.addDog = function (dog) {
      $scope.addedDogUI.push(dog);
      var dogIndex = $scope.dogs.indexOf(dog);


      if (dogIndex > -1) {
        $scope.dogs.splice(dogIndex, 1);
      }
    };

    $scope.removeDog = function (dog) {
      var dogOutIndex = $scope.addedDogUI.indexOf(dog);
      $scope.dogs.push(dog)
      if (dogOutIndex > -1) {
        $scope.addedDogUI.splice(dogOutIndex, 1);
      }
    };

    var loadAllDogs = function () {
      $scope.dogs = null;

      FactoryDog.getAll()
        .success(function (response) {
          $scope.dogs = response;
          loadHomework();
        })
        .error(function () {
          flash.error = 'A error occured while loading dogs.';
        });
    };

    var loadHomework = function () {
      FactoryHomework.get($routeParams.id)
        .success(function (response) {
          $scope.Homework = response;

          $scope.addedDogUI = response.Dogs;

        $scope.dogs = $scope.dogs.filter(removeDuplicate);

        $scope.Homework.StartDate = new Date($scope.Homework.StartDate);
        $scope.Homework.EndDate = new Date($scope.Homework.EndDate);
        })
        .error(function (error) {
          flash.error = 'Sorry we could not access the job in question.';
        });
    }

    /**
     * @method removeDuplicate
     * @return return the bool of if obj is in doglistArray
     * @param obj, what you are looking for, must be type dog.
     *
     */
    var removeDuplicate = function (obj) {
      var doglistArray = HelperService.convert.objectArrayToIdArray($scope.Homework.Dogs);
      return (doglistArray.indexOf(obj.id) == -1);
    };

    $scope.submitHomework = function (isValid) {

      $scope.submitted = true;
      if (isValid) {

        if ($scope.Homework.Title != "" && $scope.Homework.Description != "") {

          $scope.Homework.Dogs = HelperService.convert.objectArrayToIdArray($scope.addedDogUI);
          FactoryHomework.update($scope.Homework)
            .success(function (res) {
              $rootScope.HomeworkSubmitted = true;

              flash.success="Homework Saved";
            })
            .error(function (err) {

            });
        }
      }
    };

    init();
  });
