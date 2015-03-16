'use strict';

/* global Mockery */
/* global chance */
/* exported mockNote */

Mockery.mockNote = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id = chance.hash();
    mock.Title    = chance.sentence({words: 5});
    mock.Note     = chance.paragraph();
    mock.NoteType = chance.word();

    if (recurse) {
        var i;

        mock.Dogs = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Dogs.push(Mockery.mockDog({}, false));
        }

        mock.Charges = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Charges.push(Mockery.mockCharge({Note: mock.id}, false));
        }

        mock.Consultations = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Consultations.push(Mockery.mockConsultation({Note: mock.id}, false));
        }

        mock.Daycares = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Daycares.push(Mockery.mockDaycare({Note: mock.id}, false));
        }
    }


    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
