'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('QuoteCtrl', function ($scope, FactoryBusinessInfo, FactoryQuote, FactoryService, flash,$window) {

    $scope.Services = {};

    //--------------------------------------Business Info Stuff------------------------------------------------------

    FactoryBusinessInfo.get()
      .success(function (res) {
        $scope.BusinessInfo = res;
      });


    $scope.Services.Date = new Date();

    //-----------------------------------Adding Services---------------------------------------------------------
    $scope.addingService = false;

    FactoryService.getAll()
      .success(function (res) {
        $scope.ServiceList = res;
      });


    $scope.print = function ()
    {
      $window.print();
    }


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
