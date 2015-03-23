'use strict';

/* global Mockery */
/* global chance */
/* global moment */

Mockery.mockCost = function (attributes, recurse) {
  recurse = typeof recurse !== 'undefined' ? recurse : true;

  //build properties
  var mock = {};
  mock.id           = chance.hash();
  mock.Date         = moment(chance.date()).format();
  mock.Description  = chance.paragraph();
  mock.Cost         = chance.floating({min: 0, max: 100, fixed: 2});
  mock.Consultation = chance.hash();
  mock.Daycare      = chance.hash();
  mock.Referral     = chance.hash();

  // generate deeper layers if needed
  if(recurse) {
    mock.Consultation = Mockery.mockConsultation({}, false);
    mock.Daycare      = Mockery.mockDaycare({}, false);
    mock.Referral     = Mockery.mockReferral({Cost: mock.id}, false);
  }

  for (var attribute in attributes) {
    mock[attribute] = attributes[attribute];
  }

  return mock;
};
