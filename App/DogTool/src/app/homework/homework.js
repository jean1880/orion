'use strict';

/**
 * Controller of the dogToolApp, manages the homework.html, designed to gather data of specific homework via homework ids.
 * @class HomeworkCtrl
 */
angular.module('dogToolApp')
    .controller('HomeworkCtrl', function ($scope, $location, FactoryDog, FactoryHomework, flash, $rootScope, HelperService, $stateParams) {
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
        };

        /**
         * Adds dog to homework
         * @method addDog
         * @param {Object} dog Dog to add to the homework
         */
        $scope.addDog = function (dog) {
            $scope.addedDogUI.push(dog);
            var dogIndex = $scope.dogs.indexOf(dog);


            if (dogIndex > -1) {
                $scope.dogs.splice(dogIndex, 1);
            }
        };

        /**
         * Removes dog from homework
         * @method removeDog
         * @param {object} dog Dog object to be removed
         */
        $scope.removeDog = function (dog) {
            var dogOutIndex = $scope.addedDogUI.indexOf(dog);
            $scope.dogs.push(dog);
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
            FactoryHomework.get($stateParams.id)
                .success(function (response) {
                    $scope.Homework = response;
                    var doglistArray = HelperService.convert.objectArrayToIdArray($scope.dogs);
                    console.log(doglistArray);
                    angular.forEach(response.Dogs, function (value, key) {
                        console.log(doglistArray.indexOf(value.id), value.id);
                        if (doglistArray.indexOf(value.id) !== -1) {
                            $scope.addedDogUI.push($scope.dogs[doglistArray.indexOf(value.id)]);
                        }
                    });
                    console.log(response);
                    $scope.dogs = $scope.dogs.filter(removeDuplicate);

                    $scope.Homework.StartDate = new Date($scope.Homework.StartDate);
                    $scope.Homework.EndDate = new Date($scope.Homework.EndDate);
                    console.log("status:", $scope.Homework.Status);
                })
                .error(function (error) {
                    flash.error = 'Sorry we could not access the job in question.';
                });
        };

        var cloneObj = function (obj) {
            if (null == obj || "object" != typeof obj) {
                return obj;
            }
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = obj[attr];
                }
            }
            return copy;
        };
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

        /**
         * Submits a new homework set to the database
         * @method submitHomework
         * @paramm  {boolean} isValid   Whether the form is valid or not
         */
        $scope.submitHomework = function (isValid) {
            $scope.submitted = true;
            console.log("isVald:", isValid, " Lenght", $scope.addedDogUI.lenght);
            if (isValid && $scope.addedDogUI.length > 0) {

                if ($scope.Homework.Title != "" && $scope.Homework.Description != "") {

                    $scope.Homework.Dogs = HelperService.convert.objectArrayToIdArray($scope.addedDogUI);
                    FactoryHomework.update($scope.Homework)
                        .success(function (res) {
                            $rootScope.HomeworkSubmitted = true;

                            flash.success = "Homework Saved";
                        })
                        .error(function (err) {

                        });
                }
            } else {
                flash.error = "You must add a dog before submitting a homework task";
            }
        };

        init();
    });