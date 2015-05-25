'use strict';

/* global Mockery */

describe('Controller: PeopleViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PeopleViewCtrl,
    scope,
    $httpBackend,
    $location,
    SailsRoute,
    FactoryPeople,
    $routeParams,
    flash;

  var personGetHandler,
    personPostHandler;

  var person;

  var runController = inject(function ($controller) {
    PeopleViewCtrl = $controller('PeopleViewCtrl', {
      $scope: scope
    });
  });

  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryPeople = $injector.get('FactoryPeople');
    $routeParams  = $injector.get('$routeParams');
    flash         = $injector.get('flash');

    spyOn($location, 'path');
    spyOn(FactoryPeople, 'get').and.callThrough();
    spyOn(FactoryPeople, 'update').and.callThrough();

    person = Mockery.mockPerson({}, false);

    $routeParams.id = person.id;

    personGetHandler  = $httpBackend.whenGET(SailsRoute.People.get(person.id)).respond(200, person);
    personPostHandler = $httpBackend.whenPOST(SailsRoute.People.update(person.id)).respond(200, person);
  }));


  describe('when loaded', function() {
    it('tries to load the correct person', function () {
      runController();
      expect(FactoryPeople.get).toHaveBeenCalledWith(person.id);
    });

    describe('when loading a person is successful', function() {
      beforeEach(function() {
        personGetHandler.respond(200, person);
        runController();
        $httpBackend.flush();
      });

      it('stores the loaded person in $scope.person', function () {
        expect(scope.person).toEqual(person);
      });
    });

    describe('when a person is not found', function() {
      beforeEach(function() {
        personGetHandler.respond(404, {message: 'not found'});
        runController();
        $httpBackend.flush();
      });

      it('sets an error flash', function () {
        expect(flash.error).toBeDefined();
      });

      it('changes the location to people list', function () {
        expect($location.path).toHaveBeenCalledWith('/people');
      });
    });

    describe('when loading a person is unsuccessful', function() {
      beforeEach(function() {
        personGetHandler.respond(500, {message: 'internal error'});
        runController();
        $httpBackend.flush();
      });

      it('sets an error flash', function () {
        expect(flash.error).toBeDefined();
      });

      it('changes the location to people list', function () {
        expect($location.path).toHaveBeenCalledWith('/people');
      });
    });

    describe('$scope.editInfoBtn', function() {
      beforeEach(function() {
        runController();
        $httpBackend.flush();

        scope.editInfoBtn();
      });

      it('makes a copy of $scope.person to editedPerson', function() {
        expect(scope.editedPerson).toEqual(scope.person);
        expect(scope.editedPerson).not.toBe(scope.person);
      });

      it('sets scope.editingInfo to true', function () {
        expect(scope.editingInfo).toEqual(true);
      });
    });

    describe('$scope.cancelInfoBtn', function() {
      beforeEach(function() {
        runController();
        $httpBackend.flush();

        scope.cancelInfoBtn();
      });

      it('sets scope.editingInfo to false', function () {
        expect(scope.editingInfo).toEqual(false);
      });
    });

    describe('$scope.editInfoSubmit', function() {
      var updatedPerson;

      beforeEach(function() {
        runController();
        $httpBackend.flush();

        updatedPerson = Mockery.mockPerson({id: person.id});
        scope.editedPerson = updatedPerson;

        scope.editingInfo = true;
      });

      it('tries to update the person', function() {
        scope.editInfoSubmit();

        expect(FactoryPeople.update).toHaveBeenCalledWith(updatedPerson);
      });

      describe('when updating the person is successful', function() {
        beforeEach(function() {
          personPostHandler.respond(200, updatedPerson);
          scope.editInfoSubmit();
          $httpBackend.flush();
        });

        it('updates the person with the new info', function() {
          expect(scope.person).toEqual(updatedPerson);
        });

        it('sets scope.editingInfo to false', function () {
          expect(scope.editingInfo).toEqual(false);
        });
      });

      describe('when updating the person is unsuccessful', function() {
        beforeEach(function() {
          personPostHandler.respond(500, {message: 'internal error'});
          scope.editInfoSubmit();
          $httpBackend.flush();
        });

        it('sets an error flash', function() {
          expect(flash.error).toBeDefined();
        });

        it('does not update the person with the new info', function() {
          expect(scope.person).not.toEqual(updatedPerson);
        });

        it('does not set scope.editingInfo to false', function () {
          expect(scope.editingInfo).not.toEqual(false);
        });
      });
    });
  });
});
