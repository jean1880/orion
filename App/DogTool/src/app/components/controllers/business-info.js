(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name dogToolApp.controller:BusinessinfoCtrl
   * @description
   * # BusinessinfoCtrl
   * Controller of the dogToolApp
   */
  angular.module('dogToolApp')
    .controller('BusinessinfoCtrl', function ($scope, FactoryBusinessInfo, FactoryExpense, flash) {


      $scope.Title = "Business Information";

      //Functions for Expenses
      //****************************************************************************************

      FactoryExpense.getAll()
        .then(function (res) {
          $scope.ExpenseInfo = res;
        });

      $scope.addingExpense = false;

      $scope.addExpense = function () {
        $scope.newExpense = {};
        $scope.addingExpense = true;

      };

      $scope.cancelExpense = function () {
        $scope.newExpense = {};
        $scope.addingExpense = false;
        $scope.addExpenseForm.$setUntouched();
      };

      $scope.saveExpense = function () {

        if ($scope.addExpenseForm.$valid) {
          if ($scope.addExpenseForm.$dirty) {

            addNewExpense($scope.newExpense);
          } else {
            $scope.addingExpense = false;
          }
        } else {
          $scope.addingExpense = false;
        }

        $scope.addingExpense = false;
      };

      var addNewExpense = function (expense) {
        FactoryExpense.post(expense)
          .then(processSuccessExpense)
         .catch(processErrorExpense);
      };

      var processSuccessExpense = function () {
        FactoryExpense.getAll()
          .then(function (res) {
            $scope.ExpenseInfo = res;
          });
        $scope.cancelExpense();
      };

      var processErrorExpense = function () {
        flash.error = 'An error occured';
      }


      //Functions for Business Information
      //****************************************************************************************

      FactoryBusinessInfo.get()
        .then(function (res) {
          $scope.BusinessInfo = res;
        });

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

            updateInfo($scope.editedInfo);
          } else {
            $scope.editingInfo = false;
          }
        } else {
          $scope.editingInfo = false;
        }
      };

      var updateInfo = function (info) {
        FactoryBusinessInfo.update(info)
          .then(processSuccess)
         .catch(processError);
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

}());