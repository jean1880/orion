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
      .success(function (res) {
        $scope.BusinessInfo = res;
      });
    
    $scope.Title = "Business Information";
  
    $scope.editingInfo = false;
  
    $scope.editInfo = function () {
      
      $scope.editedInfo = angular.copy($scope.BusinessInfo);
      $scope.businessInfoForm.$setDirty(false);
      
      
      $scope.editingInfo = true;
    };

    $scope.cancelEdit = function () {

      
      $scope.editingInfo = false;
    };

    $scope.saveInfo = function () {
      if ($scope.businessInfoForm.$valid) {
        if ($scope.businessInfoForm.$dirty) {
          console.log($scope.editedInfo);
          updateInfo($scope.editedInfo);
        } else {
          $scope.editingInfo = false;
        }
      }
    };
  
    var updateInfo = function (info){
      FactoryBusinessInfo.update(info)
        .success(processSuccess)
        .error(processError);
    };
  
  /**
     * Processes a successful response from the server
     *
     * updates the dog on the scope with the new data from the response
     *
     * @private
     * @method processSuccess
     * @param {Sails.response} response The response from the server containing
     *   the new dog data
     */
    var processSuccess = function (res) {
      $scope.BusinessInfo = $scope.editedInfo;
      $scope.editingInfo = false;
      $scope.businessInfoForm.$setDirty(false);
    };

    /**
     * Processes a failed response from the server
     *
     * @private
     * @method processError
     * @param {Sails.response} response The response from the server containing
     *   the reason the request failed
     */
    var processError = function () {
      flash.error = 'An error occured';
    };

  });