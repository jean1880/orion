'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:InvoiceCtrl
 * @description
 * # InvoiceCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
  .controller('InvoiceCtrl', function ($routeParams, FactoryInvoice, FactoryJob, FactoryJobType, FactoryBusinessInfo, flash, $scope, FactoryPeople, $window) {

    /**
     * init initializes the data pulled for the invoice
     *
     *
     */
    var init = function () {
      FactoryJob.get($routeParams.id)
        .success(function (response) {
          $scope.bookingData = response;
          FactoryJobType.getAll()
            .success(function (response) {
              $scope.jobTypes = response;
            })
            .error(function () {
              flash.error = 'An error occured while loading job types.';
            });
          FactoryPeople.get(response.Dogs[0].Owner)
            .success(function (ownerRes) {
              $scope.ownerData = ownerRes;
            })
            .error(function (ownerErr) {
              flash.error = "There was a problem loading the owner"
            });
          FactoryInvoice.get(response.Invoice.id)
            .success(function (res) {
              $scope.invoiceData = res;
            })
            .error(function (err) {
              flash.error = "Sorry, there was a problem with loading the invoice";
            });
        })
        .error(function (err) {
          flash.error = "Sorry there was a problem loading the booking information";
        });

      $scope.invoiceSubTotal;
      $scope.invoiceTaxes;
      $scope.taxRate = 13;
      $scope.subtotal = function () {
        $scope.invoiceSubTotal = 0;
        //        console.log("test run", $scope.invoiceSubTotal);
        if ($scope.invoiceData) {
          $scope.invoiceData.Charges.forEach(function (charge) {
            //            console.log("charge:", charge);
            if (charge.JobType != null) {
              $scope.invoiceSubTotal += ($scope.bookingData.Jobtype.Value * charge.Quantity);
              //              console.log("add:", $scope.invoiceSubTotal);
            } else {
              $scope.invoiceSubTotal += (charge.Value * charge.Quantity);
              //              console.log("value:", $scope.invoiceSubTotal);
            }
          });
          //          console.log($scope.invoiceSubTotal);
          return $scope.invoiceSubTotal;
        } else {
          return 0;
        }
      };
      $scope.taxes = function () {
        return $scope.invoiceSubTotal * ($scope.taxRate / 100);

      }

      $scope.today = new Date();
      $scope.dateDue = new Date();
      FactoryBusinessInfo.get()
        .success(function (res) {
          $scope.BusinessInfo = res;
        });
    };

    /**
     * addCharge adds a new charge to the invoice
     *
     *
     */
    $scope.addCharge = function () {

      $scope.invoiceData.Charges.push({
        "Quantity": 1,
        "Invoice": $scope.invoiceData.id,
        "ServiceCustom": "",
        "Value": 0
      })
      console.log("New Charge", $scope.invoiceData.Charges)
    }

    /**
     * removeCharge adds a new charge to the invoice
     *
     *
     */
    $scope.removeCharge = function (chargeIndex) {

      $scope.invoiceData.Charges.splice(chargeIndex, 1);
      console.log("New Charges Deleted:", $scope.invoiceData.Charges)
    }

    /**
     * saveInvoice saves the invoice the invoice
     *
     *
     */
    $scope.saveInvoice = function () {
      console.log("save");
      FactoryInvoice.update($scope.invoiceData)
        .success(function (res) {
         flash.success="Invoice Saved";
        })
        .error(function (err) {
          flash.error = "Sorry, there was a problem with loading the invoice";
        });
    }

    /**
     * printInvoice print the invoice the invoice
     *
     *
     */
    $scope.printInvoice = function () {
      $window.print();
    }


    init();

  });