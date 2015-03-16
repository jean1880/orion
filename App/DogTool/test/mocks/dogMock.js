'use strict';

/* global Mockery */
/* global chance */
/* exported mockDog */

Mockery.mockDog = function (attributes, recurse) {
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
        Birthdate: moment(chance.birthday()).format(),
        Notes: [],
        Consultations: [],
        Daycares: [],
        Referral: null,
        Homeworks: [],
        Photo: null
    };

    if (recurse) {
        var weight = this.mockWeight({ Dog: dog.id }, false);
        dog.Weights.push(weight);
    }

    for (var attribute in attributes) {
        dog[attribute] = attributes[attribute];
    }

    return dog;
}
