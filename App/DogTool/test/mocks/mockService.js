'use strict';

/* global Mockery */
/* global chance */
/* exported mockNote */

Mockery.mockReferral = function (attributes, recurse) {
    recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

    var mock = {};
    mock.id    = chance.hash();
    mock.Value = chance.floating({min: 0, max: 100, fixed: 2});

    if (recurse) {
        var i;

        mock.Charges = [];
        for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
            mock.Charges.push(Mockery.mockCharge({Serivce: mock.id}, false));
        }
    }


    for (var attribute in attributes) {
        mock[attribute] = attributes[attribute];
    }

    return mock;
};
