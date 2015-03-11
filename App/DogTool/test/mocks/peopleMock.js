'use strict';

/* global chance */
/* global Mockery */
/* exported mockPerson */

Mockery.mockPerson = function (attributes, recurse) {
    attributes = typeof attributes !== 'undefined' ? attributes : {};
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var person = {
    	id: chance.natural(),
    	Dogs: [],
    	PeopleType: '',
    	Referrals: [],
    	Address: null,
    	Name: chance.name(),
    	Email: '',
    	Phone: ''
    };

    if (recurse) {

    }

    for (var attribute in attributes) {
        person[attribute] = attributes[attribute];
    }


    return person;
}
