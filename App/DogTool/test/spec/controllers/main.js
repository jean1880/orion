'use strict';

/* global chance */
/* global mockDog */

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var MainCtrl,
    scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location;

  var dogs;

  var runController = inject(function ($controller) {
    var ctrl = $controller('MainCtrl', {
      $scope: scope,
    });

    $httpBackend.flush();

    return ctrl;
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$httpBackend_, _SailsRoute_, _$location_, _FactoryDog_) {
    scope = $rootScope.$new();

    $httpBackend  = _$httpBackend_;
    $location     = _$location_;
    SailsRoute    = _SailsRoute_;
    FactoryDog    = _FactoryDog_;

    dogs = [];

    for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
      dogs.push(mockDog());
    }
  }));

  it('gets all factoryDogs from factoryDogs', function () {
    $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
    spyOn(FactoryDog, 'getAll').and.callThrough();

    runController();

    expect(FactoryDog.getAll).toHaveBeenCalled();
  });

  describe('when getting all dogs is successful', function () {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
    });

    it('populates $scope.dogs', function () {
      spyOn($location, 'path');

      runController();

      expect(scope.dogs).toBeDefined();
      expect(scope.dogs.length).toBe(dogs.length);
    });
  });

  describe('when getting a dog returns a 404', function () {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.route).respond(404, {message: 'not found'});
    });
  });
});
