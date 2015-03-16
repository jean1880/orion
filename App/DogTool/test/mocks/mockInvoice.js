'use strict';

/* global chance */
/* global Mockery */
/* global moment */

Mockery.mockInvoice = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id   = chance.hash();
    mock.Date = moment(chance.date()).format();

    if (recurse) {
        var i;

        mock.Consultations = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Consultations.push(Mockery.mockConsultation({Invoice: mock.id}, false));
        }

        mock.Daycares = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Daycares.push(Mockery.mockDaycare({Invoice: mock.id}, false));
        }
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }


    return mock;
};
