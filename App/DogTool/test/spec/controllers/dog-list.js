'use strict';

/* global Mockery */
/* global chance */

describe('Controller: DogListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogListCtrl;

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location,
    flash,
    dogGetAllHandler;

  var dogs;

  var runController = inject(function ($controller) {
    DogListCtrl = $controller('DogListCtrl', {
      $scope: scope
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');
    flash         = $injector.get('flash');

    dogs = [];

    dogGetAllHandler = $httpBackend.whenGET(SailsRoute.Dog.getAll).respond(200, dogs);

    spyOn(FactoryDog, 'getAll').and.callThrough();
    spyOn($location, 'path');

    for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
      dogs.push(Mockery.mockDog());
    }
  }));

  describe('when the controller is loaded', function () {
    beforeEach(function () {
      runController();
      $httpBackend.flush();
    });

    it('gets all dogs from factoryDogs', function () {
      expect(FactoryDog.getAll).toHaveBeenCalled();
    });
  });

  describe('when getting all dogs is successful', function () {
    beforeEach(function () {
      runController();
      $httpBackend.flush();
    });

    it('populates $scope.dogs', function () {
      expect(scope.dogs).toBeDefined();
      expect(scope.dogs.length).toBe(dogs.length);
    });
  });

  describe('when getting a dog returns a 404', function () {
    beforeEach(function () {
      dogGetAllHandler.respond(404, {message: 'not found'});

      runController();

      $httpBackend.flush();
    });

    it('prints a flash message', function () {
      expect(flash.error).not.toBeUndefined();
    });
  });

  describe('$scope.addBtnClick()', function () {
    beforeEach(function () {
      runController();
      $httpBackend.flush();
      scope.addBtnClick();
    });

    it('changes the location to the new dog page', function () {
      expect($location.path).toHaveBeenCalledWith('/dog/new');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
