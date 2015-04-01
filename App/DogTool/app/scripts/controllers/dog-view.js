'use strict';

/* global moment */

/**
 * @ngdoc function
 * @name dogToolApp.controller:DogCtrl
 * @description
 * # DogCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('DogViewCtrl', function ($scope, $routeParams, $location, FactoryDog) {
    var init = function() {
      loadDog($routeParams.id);

      $scope.editOwner      = false;
      $scope.editVet        = false;
      $scope.editEmgContact = false;
    };

    var loadDog = function (id) {
      FactoryDog.get(id)
        .success(function (response) {
          var dog = response;

          dog.Age = moment(dog.Birthdate).fromNow(true);

          $scope.dog = dog;
        })
        .error(function () {
          $location.path('/');
        });
    };

    $scope.editBtn = function() {
      $location.path('/dog/' + $scope.dog.id + '/edit');
    };

    $scope.editOwnerBtn   = function () { $scope.editOwner = true;  };
    $scope.cancelOwnerBtn = function () { $scope.editOwner = false; };

    $scope.editVetBtn   = function () { $scope.editVet = true;  };
    $scope.cancelVetBtn = function () { $scope.editVet = false; };

    $scope.editEmgContactBtn   = function () { $scope.editEmgContact = true;  };
    $scope.cancelEmgContactBtn = function () { $scope.editEmgContact = false; };


    init();
  });
