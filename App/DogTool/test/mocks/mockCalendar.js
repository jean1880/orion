'use strict';

/* global Mockery */
/* global chance */
/* global moment */

Mockery.mockCalendar = function (attributes, recurse) {
    recurse = typeof recurse !== 'undefined' ? recurse : true;

    //build properties
    var mock = {};
    mock.id            = chance.hash();
    mock.StartDate     = moment(chance.date()).format();
    mock.EndDate       = moment(chance.date()).format();

    // generate deeper layers if needed
    if(recurse) {
        mock.Consultations = [];
        mock.Daycares      = [];

        // generate list of consultations
        var i;
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Consultations.push(Mockery.mockConsultation({}, false));
        }

        // generate list of daycares
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Daycares.push(Mockery.mockDaycare({}, false));
        }
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
