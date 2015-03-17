'use strict';

/* global Mockery */
/* global chance */
/* exported mockDog */

Mockery.mockBusinessInfo = function (attributes, recurse) {
    recurse = typeof recurse !== 'undefined' ? recurse : true;

    var mock = {};
    mock.id           = chance.hash();
    mock.Owner        = chance.hash();
    mock.BusinessName = chance.sentence({words: 5});
    mock.TaxNumber    = chance.string({length: 16});
    mock.BBNNumber    = chance.string({length: 16});
    mock.Address      = chance.hash();

    // generate deeper layers if needed
    if(recurse) {
        mock.Owner   = Mockery.mockPerson({}, false);
        mock.Address = Mockery.mockAddress({}, false);
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
