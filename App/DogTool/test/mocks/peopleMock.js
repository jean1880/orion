'use strict';

/* global chance */
/* exported mockPerson */

function mockPerson(attributes, recurse) {
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
