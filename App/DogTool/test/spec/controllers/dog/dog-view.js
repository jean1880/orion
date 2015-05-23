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
    dogGetHandler,
    dogPostHandler;

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

    dogGetHandler  = $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
    dogPostHandler = $httpBackend.whenPOST(SailsRoute.Dog.update(dog.id)).respond(200, dog);
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

    it('sets an error flash', function () {
      expect(flash.error).toBeDefined();
    });
  });

  describe('when getting a dog returns a 500', function () {
    beforeEach(function () {
      dogGetHandler.respond(500, {message: 'not found'});
      runController();
    });

    it('redirects to homepage', function () {
      expect($location.path).toHaveBeenCalledWith('/');
    });

    it('sets an error flash', function () {
      expect(flash.error).toBeDefined();
    });
  });

  describe('$scope.ownerUpdated', function () {
    var person;

    beforeEach(function () {
      dogPostHandler.respond(200, dog);

      runController();

      person = Mockery.mockPerson();
    });

    it('tries to update a dog', function () {
      scope.ownerUpdated(person.id);

      expect(FactoryDog.update).toHaveBeenCalled();
    });

    it('tries to update the correct dog', function () {
      scope.ownerUpdated(person.id);

      var payload = FactoryDog.update.calls.mostRecent().args[0];
      expect(payload.id).toEqual(dog.id);
    });

    it('tries to update the dog to the right person', function () {
      scope.ownerUpdated(person.id);

      var payload = FactoryDog.update.calls.mostRecent().args[0];
      expect(payload.Owner).toEqual(person.id);
    });

    describe('when updating is successful', function() {
      beforeEach(function () {
        dogPostHandler.respond(200, dog);
      });

      it('sets a success flash', function() {
        scope.ownerUpdated(person.id);

        $httpBackend.flush();

        expect(flash.success).toBeDefined();
      });
    });

    describe('when updating is unsuccessful', function() {
      beforeEach(function () {
        dogPostHandler.respond(400, {});
      });

      it('does not set a success flash', function () {
        scope.ownerUpdated(person.id);

        $httpBackend.flush();

        expect(flash.success).not.toBeDefined();
      });

      it('sets an error flash', function () {
        scope.ownerUpdated(person.id);

        $httpBackend.flush();

        expect(flash.error).toBeDefined();
      });
    });
  });

  describe('$scope.vetUpdated', function () {
    var person;

    beforeEach(function () {
      dogPostHandler.respond(200, dog);

      runController();

      person = Mockery.mockPerson();
    });

    it('tries to update a dog', function () {
      scope.vetUpdated(person.id);

      expect(FactoryDog.update).toHaveBeenCalled();
    });

    it('tries to update the correct dog', function () {
      scope.vetUpdated(person.id);

      var payload = FactoryDog.update.calls.mostRecent().args[0];
      expect(payload.id).toEqual(dog.id);
    });

    it('tries to update the dog to the right person', function () {
      scope.vetUpdated(person.id);

      var payload = FactoryDog.update.calls.mostRecent().args[0];
      expect(payload.Vet).toEqual(person.id);
    });

    describe('when updating is successful', function() {
      beforeEach(function () {
        dogPostHandler.respond(200, dog);
      });

      it('sets a success flash', function() {
        scope.vetUpdated(person.id);

        $httpBackend.flush();

        expect(flash.success).toBeDefined();
      });
    });

    describe('when updating is unsuccessful', function() {
      beforeEach(function () {
        dogPostHandler.respond(400, {});
      });

      it('does not set a success flash', function () {
        scope.vetUpdated(person.id);

        $httpBackend.flush();

        expect(flash.success).not.toBeDefined();
      });

      it('sets an error flash', function () {
        scope.vetUpdated(person.id);

        $httpBackend.flush();

        expect(flash.error).toBeDefined();
      });
    });
  });

  describe('$scope.emgContactUpdated', function () {
    var person;

    beforeEach(function () {
      dogPostHandler.respond(200, dog);

      runController();

      person = Mockery.mockPerson();
    });

    it('tries to update a dog', function () {
      scope.emgContactUpdated(person.id);

      expect(FactoryDog.update).toHaveBeenCalled();
    });

    it('tries to update the correct dog', function () {
      scope.emgContactUpdated(person.id);

      var payload = FactoryDog.update.calls.mostRecent().args[0];
      expect(payload.id).toEqual(dog.id);
    });

    it('tries to update the dog to the right person', function () {
      scope.emgContactUpdated(person.id);

      var payload = FactoryDog.update.calls.mostRecent().args[0];
      expect(payload.EmergencyContact).toEqual(person.id);
    });

    describe('when updating is successful', function() {
      beforeEach(function () {
        dogPostHandler.respond(200, dog);
      });

      it('sets a success flash', function() {
        scope.emgContactUpdated(person.id);

        $httpBackend.flush();

        expect(flash.success).toBeDefined();
      });
    });

    describe('when updating is unsuccessful', function() {
      beforeEach(function () {
        dogPostHandler.respond(400, {});
      });

      it('does not set a success flash', function () {
        scope.emgContactUpdated(person.id);

        $httpBackend.flush();

        expect(flash.success).not.toBeDefined();
      });

      it('sets an error flash', function () {
        scope.emgContactUpdated(person.id);

        $httpBackend.flush();

        expect(flash.error).toBeDefined();
      });
    });
  });
});
