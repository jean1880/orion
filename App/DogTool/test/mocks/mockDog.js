'use strict';

/* global Mockery */
/* global chance */
/* global moment */

Mockery.mockDog = function (attributes, recurse) {
  recurse    = typeof recurse    !== 'undefined' ? recurse    : true;

  var mock = {};
  mock.id               = chance.hash();
  mock.Owner            = chance.hash();
  mock.Vet              = chance.hash();
  mock.EmergencyContact = chance.hash();
  mock.Referral         = chance.hash();
  mock.Name             = chance.first();
  mock.Breed            = chance.word({length: 2});
  mock.Birthdate        = moment(chance.birthday()).format();
  mock.Photo            = chance.url({path: 'images', extensions: ['gif', 'jpg', 'png']});

  if (recurse) {
    mock.Owner            = Mockery.mockPerson({}, false);
    mock.Vet              = Mockery.mockPerson({}, false);
    mock.EmergencyContact = Mockery.mockPerson({}, false);
    mock.Referral         = Mockery.mockReferral({}, false);

    var i;
    mock.Weights          = [];
    for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
      mock.Weights.push(Mockery.mockWeight({Dog: mock.id}, false));
    }

    mock.Notes            = [];
    for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
      mock.Notes.push(Mockery.mockNote({}, false));
    }

    mock.Consultations    = [];
    for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
      mock.Consultations.push(Mockery.mockConsultation({}, false));
    }

    mock.Daycares         = [];
    for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
      mock.Daycares.push(Mockery.mockDaycare({}, false));
    }

    mock.Homeworks        = [];
    for(i = chance.natural({min: 3, max: 5}); i > 0; i--) {
      mock.Homeworks.push(Mockery.mockHomework({}, false));
    }

  }

  for (var attribute in attributes) {
    mock[attribute] = attributes[attribute];
  }

  return mock;
};
