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

    console.log(self);


    Job.create(self).exec(function (err, result) {
      if (!err) {
        console.log(result);

        var charges = [];

        var deltaDate = 1
        if (!self.Calendars.IsAllDay) {
          deltaDate = new Date(new Date(self.Calendars.EndDate) - new Date(self.Calendars.StartDate));
          deltaDate = deltaDate.getUTCDate() - 1;
        }

        console.log("Date Delta: " + deltaDate);

        // for each dog, create a charge, times the number of days
        for (var i = self.Dogs.length; i >= 0; i--) {
          charges.push({
            Quantity: deltaDate

          });
        }

        // create an invoice from the booking
        /*Invoice.create({
          Date: new Date(),
          Job: result.id,
          Charges:
        })*/
      }
    })
  }
};