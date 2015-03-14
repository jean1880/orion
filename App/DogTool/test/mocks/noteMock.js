'use strict';

/* global Mockery */
/* global chance */
/* exported mockNote */

Mockery.mockNote = function (attributes, recurse) {
    attributes = typeof attributes !== 'undefined' ? attributes : {};
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var note = {
        id: chance.natural(),
        Title: chance.first(),
        Note: chance.first(),
        Dogs: [],
        NoteType: '',
        Charges: [],
        Consultations: [],
        Daycares: []
    };

    if (recurse) {
        /*
            TODO: Figure out what should go here
        */
    }

    for (var attribute in attributes) {
        note[attribute] = attributes[attribute];
    }

    return note;
}