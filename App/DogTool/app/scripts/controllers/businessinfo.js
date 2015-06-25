'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:BusinessinfoCtrl
 * @description
 * # BusinessinfoCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('BusinessinfoCtrl', function ($scope, FactoryBusinessInfo, flash) {
    
  FactoryBusinessInfo.get()
  .success(function(res){
    $scope.BusinessInfo = res;
  });
  
  
  $scope.Title = "Business Information";
  
  
  
  $scope.editingInfo = false;
  
  $scope.editInfo = function(){
    
    if($scope.editingInfo == false){
      $scope.name = $scope.BusinessInfo.Name;
      $scope.address = $scope.BusinessInfo.Address;
      $scope.phone = $scope.BusinessInfo.Phone;
      $scope.email = $scope.BusinessInfo.Email;
      
      $scope.editingInfo = true;
    }else{
      $scope.cancelEdit;
      $scope.editingInfo = false;
    }
    
  }
  
  $scope.cancelEdit = function(){
    
    $scope.name = $scope.BusinessInfo.Name;
    $scope.address = $scope.BusinessInfo.Address;
    $scope.phone = $scope.BusinessInfo.Phone;
    $scope.email = $scope.BusinessInfo.Email;
    
    $scope.editingInfo = false;
  }
  
  $scope.saveInfo = function(){
    $scope.editingInfo = false;
  }
    
  });
