'use strict';

/* global Mockery */

describe('Controller: PeopleNewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PeopleNewCtrl,
    scope,
    FactoryPeople,
    $httpBackend,
    SailsRoute,
    flash,
    $location;

  var peoplePostHandler;

  var person;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    FactoryPeople = $injector.get('FactoryPeople');
    $httpBackend  = $injector.get('$httpBackend');
    SailsRoute    = $injector.get('SailsRoute');
    flash         = $injector.get('flash');
    $location     = $injector.get('$location');

    person = Mockery.mockPerson();

    peoplePostHandler = $httpBackend.whenPOST(SailsRoute.People.post).respond(200, person);
    spyOn(FactoryPeople, 'post').and.callThrough();

    spyOn($location, 'path');

    PeopleNewCtrl = $controller('PeopleNewCtrl', {
      $scope: scope
    });
  }));

  describe('when the controller is loaded', function () {
    it('adds an empty person to the scope', function () {
      expect(scope.person).toBeDefined();
    });
  });

  describe('$scope.editFormSubmit', function() {
    it('tries to post the new person', function() {
      scope.person = person;
      scope.editFormSubmit();
      expect(FactoryPeople.post).toHaveBeenCalledWith(person);
    });

    describe('when posting a person is successful', function() {
      beforeEach(function() {
        peoplePostHandler.respond(200, person);
        scope.person = person;
        scope.editFormSubmit();
        $httpBackend.flush();
      });

      it('sets a success flash', function () {
        expect(flash.success).toBeDefined();
      });

      it('changes to location to the person\'s view page', function () {
        expect($location.path).toHaveBeenCalledWith('/people/' + person.id);
      });
    });

    describe('when posting a person is unsucessful', function() {
      beforeEach(function() {
        peoplePostHandler.respond(500, {message: 'internal error'});
        scope.person = person;
        scope.editFormSubmit();
        $httpBackend.flush();
      });

      it('sets a error flash', function () {
        expect(flash.error).toBeDefined();
      });

      it('does not set a success flash', function () {
        expect(flash.success).not.toBeDefined();
      });

      it('does not change the location', function () {
        expect($location.path).not.toHaveBeenCalled();
      });
    });
  });
});
