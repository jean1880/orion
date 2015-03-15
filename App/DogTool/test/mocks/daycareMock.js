'use strict';

/* global chance */
/* global Mockery */
/* exported mockDaycare */

Mockery.mockDaycare = function (attributes, recurse) {
    attributes = typeof attributes !== 'undefined' ? attributes : {};
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var daycare = {
    	id: chance.natural(),
    	Dogs: [],
    	Calendars: [],
    	Costs: [],
    	Note: null,
    	Invoice: null
    };

    if (recurse) {

    }

    for (var attribute in attributes) {
        daycare[attribute] = attributes[attribute];
    }


    return daycare;
}
