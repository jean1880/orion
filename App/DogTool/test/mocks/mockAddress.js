'use strict';

/* global Mockery */
/* global chance */
/* exported mockDog */

Mockery.mockAddress = function (attributes, recurse) {
  recurse = typeof recurse !== 'undefined' ? recurse : true;

  var mock = {};
  mock.id         = chance.hash();
  mock.Street     = chance.address();
  mock.City       = chance.city();
  mock.Province   = chance.province({full: true});
  mock.Country    = chance.country();
  mock.PostalCode = chance.postal();

  // generate deeper layers if needed
  if(recurse) {
    //No other objects to generate
  }

  for (var attribute in attributes) {
    mock[attribute] = attributes[attribute];
  }

  return mock;
};
