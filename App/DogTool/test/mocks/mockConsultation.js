'use strict';

/* global Mockery */
/* global chance */

Mockery.mockConsultation = function (attributes, recurse) {
    recurse = typeof recurse !== 'undefined' ? recurse : true;

    //build properties
    var mock = {};
    mock.id            = chance.hash();
    mock.Invoice       = chance.hash();
    mock.Note          = chance.hash();

    // generate deeper layers if needed
    if(recurse) {
        mock.Invoice = Mockery.mockInvoice({}, false);
        mock.Note    = Mockery.mockNote({}, false);

        var i;

        mock.Dogs = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Dogs.push(Mockery.mockDog({}, false));
        }

        mock.Calendars = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Calendars.push(Mockery.mockCalendar({}, false));
        }

        mock.Costs = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Costs.push(Mockery.mockCost({Consultation: mock.id}, false));
        }
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
