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
  
  $scope.addService = function(){
    $scope.addingService = true;
  };
  
  $scope.cancelService = function(){
    $scope.addingService = false;
  };
});





