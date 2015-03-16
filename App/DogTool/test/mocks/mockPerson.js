'use strict';

/* global chance */
/* global Mockery */

Mockery.mockPerson = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id         = chance.hash();
    mock.Address    = chance.hash();
    mock.Name       = chance.name();
    mock.Email      = chance.email();
    mock.Phone      = chance.phone();
    mock.PeopleType = chance.word();

    if (recurse) {
        var i;

        mock.Dogs       = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Dogs.push(Mockery.mockDog({Owner: mock.id}, false));
        }

        mock.Referrals  = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Referrals.push(Mockery.mockReferral({People: mock.id}, false));
        }
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
