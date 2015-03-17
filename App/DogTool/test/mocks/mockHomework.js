'use strict';

/* global chance */
/* global Mockery */
/* global moment */

Mockery.mockHomework = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id          = chance.hash();
    mock.StartDate   = moment(chance.date()).format();
    mock.EndDate     = moment(chance.date()).format();
    mock.Description = chance.paragraph();

    if (recurse) {
        var i;

        mock.Dogs      = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Dogs.push(Mockery.mockDog({}, false));
        }
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }


    return mock;
};
