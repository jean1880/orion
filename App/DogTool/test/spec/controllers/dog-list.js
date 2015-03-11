'use strict';

/* global Mockery */
/* global chance */

describe('Controller: DogListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location,
    flash;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');
    flash         = $injector.get('flash');
  }));

  var dogs;

  var runController = inject(function ($controller) {
    var ctrl = $controller('DogListCtrl', {
      $scope: scope
    });

    $httpBackend.flush();

    return ctrl;
  });

  beforeEach(inject(function () {
    dogs = [];

    for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
      dogs.push(Mockery.mockDog());
    }
  }));

  describe('when the controller is loaded', function () {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
      spyOn(FactoryDog, 'getAll').and.callThrough();
      runController();
    });

    it('gets all dogs from factoryDogs', function () {
      expect(FactoryDog.getAll).toHaveBeenCalled();
    });
  });

  describe('when getting all dogs is successful', function () {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
      runController();
    });

    it('populates $scope.dogs', function () {
      expect(scope.dogs).toBeDefined();
      expect(scope.dogs.length).toBe(dogs.length);
    });
  });

  describe('when getting a dog returns a 404', function () {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.route).respond(404, {message: 'not found'});
      runController();
    });

    it('prints a flash message', function () {
      expect(flash.error).not.toBeUndefined();
    });
  });
});
