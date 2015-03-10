'use strict';

/* global Mockery */
/* global chance */
/* exported mockWeight */

Mockery.mockWeight = function (attributes, recurse) {
    attributes = typeof attributes !== 'undefined' ? attributes : {};
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var weight = {
    	id: chance.natural(),
    	Dog: null,
        DateTaken: chance.date(),
        Weight: chance.floating({min: 10, max: 25})
    };

    if (recurse) {

    }

    for (var attribute in attributes) {
        weight[attribute] = attributes[attribute];
    }


    return weight;
}
