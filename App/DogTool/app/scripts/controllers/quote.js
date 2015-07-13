'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('QuoteCtrl', function ($scope, FactoryBusinessInfo, FactoryQuote, flash) {
   
  //--------------------------------------Business Info Stuff------------------------------------------------------

  FactoryBusinessInfo.get()
    .success(function (res) {
      $scope.BusinessInfo = res;
    });
  
  $scope.Date = new Date(); 
  
  //-----------------------------------Adding Services---------------------------------------------------------
  $scope.addingService = false;
  $scope.Services = {};
  
  $scope.ServiceList = [
    {
        Name: "Daycare",
        Value: 50.99
    },
    {
        Name: "Bath",
        Value: 25.99
    }
  ];
    
  $scope.addService = function(){
    $scope.addingService = true;
  };
  
  $scope.cancelService = function(){
    $scope.addingService = false;
    $scope.Services = null;
    $scope.AddServiceForm.$setUntouched();
  };
  
  $scope.saveQuote = function(){
    alert("Saved");
  }
  
  $scope.saveService = function(){
    $scope.cancelService();
  }
  
});





