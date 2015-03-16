'use strict';

/* global Mockery */
/* global chance */
/* global moment */

Mockery.mockWeight = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id        = chance.hash();
    mock.Dog       = chance.hash();
    mock.DateTaken = moment(chance.date()).format();
    mock.Weight = chance.floating({min: 10, max: 25, fixed: 2});

    if (recurse) {
        mock.Dog = Mockery.mockDog({}, false);
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }


    return mock;
}
