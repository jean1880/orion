'use strict';

/**
 * @ngdoc function
 * @name dogToolApp.controller:InvoiceCtrl
 * @description
 * # InvoiceCtrl
 * Controller of the dogToolApp
 */
angular.module('dogToolApp')
    .controller('InvoiceCtrl', function ($stateParams, FactoryInvoice, FactoryJob, FactoryJobType, FactoryBusinessInfo, flash, $scope, FactoryPeople, $window) {

        /**
         * init initializes the data pulled for the invoice
         *
         *
         */
        var init = function () {
            FactoryJob.get($stateParams.id)
                .then(function (response) {
                    $scope.bookingData = response;
                    FactoryJobType.getAll()
                        .then(function (response) {
                            $scope.jobTypes = response;
                        })
                       .catch(function () {
                            flash.error = 'An error occured while loading job types.';
                        });
                    FactoryPeople.get(response.Dogs[0].Owner)
                        .then(function (ownerRes) {
                            $scope.ownerData = ownerRes;
                        })
                       .catch(function (ownerErr) {
                            flash.error = "There was a problem loading the owner"
                        });
                    FactoryInvoice.get(response.Invoice.id)
                        .then(function (res) {
                            $scope.invoiceData = res;
                        })
                       .catch(function (err) {
                            flash.error = "Sorry, there was a problem with loading the invoice";
                        });
                })
               .catch(function (err) {
                    flash.error = "Sorry there was a problem loading the booking information";
                });

            $scope.invoiceSubTotal;
            $scope.invoiceTaxes;
            $scope.taxRate = 13;
            $scope.subtotal = function () {
                $scope.invoiceSubTotal = 0;
                //
                if ($scope.invoiceData) {
                    $scope.invoiceData.Charges.forEach(function (charge) {
                        //
                        if (charge.JobType != null) {
                            $scope.invoiceSubTotal += ($scope.bookingData.Jobtype.Value * charge.Quantity);
                            //
                        } else {
                            $scope.invoiceSubTotal += (charge.Value * charge.Quantity);
                            //
                        }
                    });
                    //
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
                .then(function (res) {
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
        }

        /**
         * removeCharge adds a new charge to the invoice
         *
         *
         */
        $scope.removeCharge = function (chargeIndex) {

            $scope.invoiceData.Charges.splice(chargeIndex, 1);
        }

        /**
         * saveInvoice saves the invoice the invoice
         *
         *
         */
        $scope.saveInvoice = function () {

            FactoryInvoice.update($scope.invoiceData)
                .then(function (res) {
                    flash.success = "Invoice Saved";
                })
               .catch(function (err) {
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