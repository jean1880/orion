'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:HomeworkNewCtrl
 * @description
 * # HomeworkNewCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('HomeworkNewCtrl', function ($scope, $location, FactoryDog, FactoryHomework, flash,$rootScope) {
    $scope.hstep=1;
    $scope.mstep=15;
    $scope.ismeridian =true;
    $scope.addedDogUI=[];
    var init = function() {
      loadAllDogs();
      $scope.Homework = {Title:"Unnamed",Description:"",Dogs:[],Notes:[],StartDate:new Date(),EndDate:new Date()}
    };
  
    $scope.addDog = function(dog){
      $scope.addedDogUI.push(dog);
      var dogIndex = $scope.dogs.indexOf(dog);
      console.log(dog);
      console.log(dogIndex);
      if(dogIndex >-1)
      {
        $scope.dogs.splice(dogIndex,1);
      }
    };
  
     $scope.removeDog = function(dog){
      var dogOutIndex = $scope.addedDogUI.indexOf(dog);
      $scope.dogs.push(dog)
      if (dogOutIndex >-1)
      {
        $scope.addedDogUI.splice(dogOutIndex,1);
      }
    };
  
    var loadAllDogs = function () {
      $scope.dogs = null;

      FactoryDog.getAll()
        .success(function (response) {
          $scope.dogs = response;
        })
        .error(function () {
          flash.error = 'A error occured while loading dogs.';
        });
      if($rootScope.HomeworkSubmitted)
      {
        $rootScope.HomeworkSubmitted =false;
        $rootScope.HomeworkLog ={Title:"Unnamed",Description:"",Dogs:[],Notes:[],StartDate:new Date(),EndDate:new Date()};
      }
      else 
      {
        $scope.Homework = $rootScope.HomeworkLog;
      }
    };
  
    $scope.submitHomework = function (isValid)
    {
      $scope.submitted = true;
      if(isValid)
      {
        if (Homework.Title != "" && Homework.Description !="")
        {
          FactoryHomework.post(Homework)
            .success(function (res){
            $rootScope.HomeworkSubmitted = true;
          })
            .error(function(err){});
        }
      }
    };
  
    init();
  });
