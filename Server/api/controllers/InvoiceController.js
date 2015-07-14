'use strict';
var _ = require('lodash');
var async = require('async');
/**
 * InvoiceController
 *
 * @description :: Server-side logic for managing Invoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	makeBill: function(req, res) {
        var self = {};
        self.invoiceId = req.param('id');
        self.newInvoice = req.body;

        async.series({
            getCurrentInvoice: function(callback) {
                Invoice.findOne({id: self.invoiceId}).populateAll().exec(function (err, invoice) {
                    self.invoice = invoice;
                    callback(err, invoice);
                });
            },
            checkIfBill: function(callback) {
                if(self.invoice.IsBill) {
                    //first error stops the series
                    return callback({ invoiceIsBill: true }, true);
                }
                callback(null, false);
            },
            buildBill: function(callback) {
                self.bill = _.cloneDeep(self.invoice);
                self.bill.Date = Date.now();
                self.bill.Invoice = self.invoice.id;

                delete self.bill.id;

                callback(null, self.bill);
            },
            saveBill: function(callback) {
                Bill.create(self.bill).exec(function (err, bill) {
                    self.bill = bill;
                    callback(err, bill);
                });
            },
            getNewBill: function(callback) {
                Bill.findOne({id: self.bill.id}).populateAll().exec(callback);
            },
            lockInvoice: function(callback) {
                Invoice.update({id: self.invoiceId}, {
                    IsBill: true,
                    Bill: self.bill.id
                }).exec(callback);
            }
        },
        function(err, data) {
            if(err) {
                if (err.invoiceIsBill) {
                    return res.forbidden({ message: 'Invoice is already a bill' });
                }
                else {
                    return res.serverError(err);
                }
            }
            else {
                return res.json(data.getNewBill);
            }
        });
    },

    update: function(req, res) {
        var self = {};
        self.invoiceId = req.param('id');
        self.newInvoice = req.body;

        async.series({
            getCurrentInvoice: function(callback) {
                Invoice.findOne({id: self.invoiceId}).exec(function (err, invoice) {
                    self.invoice = invoice;
                    callback(err, invoice);
                });
            },
            checkIfBill: function(callback) {
                if(self.invoice.IsBill) {
                    //first error stops the series
                    return callback({ invoiceIsBill: true }, true);
                }
                callback(null, false);
            },
            updateInvoice: function(callback) {
                Invoice.update({id: self.invoiceId}, self.newInvoice).exec(function (err, invoices) {
                    callback(err, invoices[0]);
                });
            },
            getNewInvoice: function(callback) {
                Invoice.findOne({id: self.invoiceId}).populateAll().exec(callback);
            }
        },
        function(err, data) {
            if(err) {
                if (err.invoiceIsBill) {
                    return res.forbidden({ message: 'Invoice is a bill, and can\'t be changed' });
                }
                else {
                    return res.serverError(err);
                }
            }
            else {
                return res.json(data.getNewInvoice);
            }
        });
    }
};

