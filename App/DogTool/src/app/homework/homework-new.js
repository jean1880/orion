'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:HomeworkNewCtrl
 * @description
 * # HomeworkNewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
    .controller('HomeworkNewCtrl', function ($scope, $location, FactoryDog, FactoryHomework, flash, $rootScope, HelperService, $window, $stateParams) {
        $scope.pagination = {
            currentPage: 1,
            limit: 9
        };
        $scope.showDeceased = false;
        $scope.hstep = 1;
        $scope.mstep = 10;
        $scope.ismeridian = true;
        $scope.addedDogUI = [];

        var init = function () {
            loadAllDogs();
            $scope.Homework = {
                Title: "",
                Description: "",
                Dogs: [],
                Notes: [],
                StartDate: new Date(),
                EndDate: new Date(),
                Status: false
            }
            if ($stateParams.id != null) {
                FactoryHomework.get($stateParams.id).then(function (homeworkRes) {
                    $scope.Homework.Title = homeworkRes.Title;
                    $scope.Homework.Description = homeworkRes.Description;
                })
            }
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
                .then(function (response) {
                    $scope.dogs = response;
                })
               .catch(function () {
                    flash.error = 'A error occured while loading dogs.';
                });
            if ($rootScope.HomeworkSubmitted) {
                $rootScope.HomeworkSubmitted = false;
                $rootScope.HomeworkLog = {
                    Title: "Unnamed",
                    Description: "",
                    Dogs: [],
                    Notes: [],
                    StartDate: new Date(),
                    EndDate: new Date()
                };
            } else {
                $scope.Homework = $rootScope.HomeworkLog;
            }
        };

        $scope.submitHomework = function (isValid) {
            $scope.submitted = true;
            if (isValid) {
                if ($scope.Homework.Title != "" && $scope.Homework.Description != "") {
                    $scope.Homework.Dogs = HelperService.convert.objectArrayToIdArray($scope.addedDogUI);
                    FactoryHomework.post($scope.Homework)
                        .then(function (res) {
                            $rootScope.HomeworkSubmitted = true;
                            flash.success = "Homework Saved";
                            $window.location.href = "#/homework/" + res.id;
                        })
                       .catch(function (err) {
                            flash.error = "Failed to Sve Homework";
                        });
                }
            }
        };

        init();
    });