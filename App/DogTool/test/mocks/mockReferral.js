'use strict';

/* global Mockery */
/* global chance */
/* exported mockNote */

Mockery.mockReferral = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id           = chance.hash();
    mock.Dog          = chance.hash();
    mock.People       = chance.hash();
    mock.OtherSoruce  = chance.word();
    mock.PayedForward = chance.bool();
    mock.Cost         = chance.hash();

    if (recurse) {
        mock.Dog    = Mockery.mockDog({}, false);
        mock.People = Mockery.mockPerson({}, false);
        mock.Cost   = Mockery.mockCost({}, false);
    }


    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
