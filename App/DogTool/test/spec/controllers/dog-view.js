'use strict';

/* global Mockery */

describe('Controller: DogViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

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

    spyOn($location, 'path');
    spyOn(FactoryDog, 'update').and.callThrough();

    dog = Mockery.mockDog({}, false);

    scope.infoForm = {
      $setDirty: function (value) {
        this.$dirty = value;
      },
      $dirty: false
    };

    dogGetHandler  = $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
  }));

  var runController = inject(function ($controller) {
    var ctrl = $controller('DogViewCtrl', {
      $scope: scope,
      $routeParams: {id: dog.id}
    });

    $httpBackend.flush();

    return ctrl;
  });

  describe('when the controller is loaded', function() {
    beforeEach(function () {
      spyOn(FactoryDog, 'get').and.callThrough();
      runController();
    });

    it('gets a dog from factoryDogs', function () {
      expect(FactoryDog.get).toHaveBeenCalledWith(dog.id);
    });

    it('sets $scope.editingInfo to false', function () {
      expect(scope.editingInfo).toBeFalsy();
    });
  });

  describe('when getting a dog is successful', function () {
    beforeEach(function () {
      runController();
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
    });

    it('redirects to homepage', function () {
      expect($location.path).toHaveBeenCalledWith('/');
    });
  });
});
