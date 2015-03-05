'use strict';

/* global chance */
/* exported mockDog */

function mockDog(attributes, recurse) {
    attributes = typeof attributes !== 'undefined' ? attributes : {};
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var dog = {
        id: chance.natural(),
        Owner: null,
        Vet: null,
        EmergencyContact: null,
        Weights: [],
        Name: chance.first(),
        Breed: '',
        Age: '',
        Notes: [],
        Consultations: [],
        Daycares: [],
        Referral: null,
        Homeworks: [],
        Photo: null
    };

    if (recurse) {

    }

    for (var attribute in attributes) {
        dog[attribute] = attributes[attribute];
    }

    return dog;
}
