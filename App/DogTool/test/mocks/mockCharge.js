'use strict';

/* global Mockery */
/* global chance */

Mockery.mockCharge = function (attributes, recurse) {
    recurse = typeof recurse !== 'undefined' ? recurse : true;

    //build properties
    var mock = {};
    mock.id            = chance.hash();
    mock.Quantity      = chance.natural({min: 1, max: 20});
    mock.Invoice       = chance.hash();
    mock.Service       = chance.hash();
    mock.ServiceCustom = chance.sentence({words: 3});
    mock.Note          = chance.hash();

    // generate deeper layers if needed
    if(recurse) {
        mock.Invoice = Mockery.mockInvoice({}, false);
        mock.Service = Mockery.mockService({}, false);
        mock.Note    = Mockery.mockNote({}, false);
    }

    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
