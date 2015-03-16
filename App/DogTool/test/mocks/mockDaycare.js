'use strict';

/* global chance */
/* global Mockery */
/* exported mockDaycare */

Mockery.mockDaycare = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id        = chance.hash();
    mock.Note      = chance.hash();
    mock.Invoice   = chance.hash();

    if (recurse) {
        mock.Note    = Mockery.mockNote({}, false);
        mock.Invoice = Mockery.mockInvoice({}, false);

        var i;

        mock.Dogs      = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Dogs.push(Mockery.mockDog({}, false));
        }

        mock.Calendars = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Calendars.push(Mockery.mockCalendar({}, false));
        }

        mock.Costs     = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Costs.push(Mockery.mockCost({}, false));
        }
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }


    return mock;
};
