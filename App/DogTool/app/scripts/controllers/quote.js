'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('QuoteCtrl', function ($scope, FactoryBusinessInfo, FactoryQuote, FactoryService, flash) {

    //--------------------------------------Business Info Stuff------------------------------------------------------

    FactoryBusinessInfo.get()
      .success(function (res) {
        $scope.BusinessInfo = res;
      });


    $scope.Date = new Date();

    //-----------------------------------Adding Services---------------------------------------------------------
    $scope.addingService = false;

    FactoryService.getAll()
      .success(function (res) {
        $scope.ServiceList = res;
      });



    $scope.Services = {};

    $scope.addService = function () {
      $scope.addingService = true;
    };

    $scope.cancelService = function () {
      $scope.addingService = false;
      $scope.Services = null;
      $scope.AddServiceForm.$setUntouched();
    };

    $scope.saveQuote = function () {
      if ($scope.AddServiceForm.$valid) {
        if ($scope.AddServiceForm.$dirty) {
          console.log($scope.Services);
          FactoryQuote.post($scope.Services)
            .success(function () {
              flash.success = "Quote has been Saved!";
            })
            .error(function () {
              flash.error = "A Problem has Occured";
            });
        }
      }
    }

    $scope.saveService = function () {
      $scope.cancelService();
    }

  });