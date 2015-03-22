'use strict';

/* global Mockery */

describe('Controller: DogViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogViewCtrl;

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location,
    flash,
    dogGetHandler;

  var dog;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');
    flash         = $injector.get('flash');

    dog = Mockery.mockDog();

    dogGetHandler = $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
    spyOn(FactoryDog, 'get').and.callThrough();
    spyOn($location, 'path');
  }));

  var runController = inject(function ($controller) {
    DogViewCtrl = $controller('DogViewCtrl', {
      $scope: scope,
      $routeParams: {id: dog.id}
    });
  });

  describe('when the controller is loaded', function() {
    beforeEach(function () {
      runController();
      $httpBackend.flush();
    });

    it('gets a dog from factoryDogs', function () {
      expect(FactoryDog.get).toHaveBeenCalledWith(dog.id);
    });
  });

  describe('when getting a dog is successful', function () {
    beforeEach(function () {
      runController();
      $httpBackend.flush();
    });

    it('populates $scope.dog', function () {
      expect(scope.dog).toBeDefined();
      expect(scope.dog.id).toBe(dog.id);
    });
  });

  describe('when getting a dog returns a 404', function () {
    beforeEach(function () {
      dogGetHandler.respond(404, {message: 'not found'});
      runController();
      $httpBackend.flush();
    });

    it('redirects to homepage', function () {
      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

  describe('$scope.editBtn', function () {
    beforeEach(function () {
      runController();
      $httpBackend.flush();

      scope.editBtn();
    });

    it('changes the page location to the edit page', function () {
      expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id + '/edit');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
