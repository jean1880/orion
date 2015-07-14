/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');
module.exports = {
  create: function (req, res) {
    var self = req.body;
    var charges = [];

    var deltaDate = 1
    if (!self.Calendars.IsAllDay) {
      deltaDate = new Date(new Date(self.Calendars.EndDate) - new Date(self.Calendars.StartDate));
      deltaDate = deltaDate.getUTCDate() - 1;
    }
    deltaDate = deltaDate == 0 ? 1 : deltaDate;

    // for each dog, create a charge, times the number of days
    for (var i = self.Dogs.length - 1; i >= 0; i--) {
      charges.push({
        Quantity: deltaDate,
        JobType: self.Jobtype.id
      });
    }

    // create an invoice from the booking
    self.Invoice = {
      Date: new Date(),
      Charges: charges
    };

    // save invoice to system
    Job.create(self).exec(function (err, result) {
      if (!err) {
        console.log(result);
        res.send(result);
      }
    })
  }
};