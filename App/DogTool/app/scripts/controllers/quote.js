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
      alert("Saved");
    }

    $scope.saveService = function () {
      $scope.cancelService();
    }

  });