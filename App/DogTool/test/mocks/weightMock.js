'use strict';

/* global chance */
/* exported mockWeight */

function mockWeight(attributes, recurse) {
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
