'use strict';

/* global Mockery */

describe('Controller: PeopleListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PeopleListCtrl,
    scope,
    FactoryPeople,
    $httpBackend,
    SailsRoute,
    flash;

  var peopleGetHandler;

  var people;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $injector) {
    scope         = $rootScope.$new();
    FactoryPeople = $injector.get('FactoryPeople');
    $httpBackend  = $injector.get('$httpBackend');
    SailsRoute    = $injector.get('SailsRoute');
    flash         = $injector.get('flash');

    people = [Mockery.mockPerson()];

    peopleGetHandler = $httpBackend.whenGET(SailsRoute.People.getAll).respond(200, people);

    spyOn(FactoryPeople, 'getAll').and.callThrough();
  }));

  var runController = inject(function($controller) {
    PeopleListCtrl = $controller('PeopleListCtrl', {
      $scope: scope
    });
  });

  describe('when loaded', function() {
    it('tries to load all people', function () {
      runController();

      expect(FactoryPeople.getAll).toHaveBeenCalled();
    });

    describe('when loading all people is successful', function() {
      beforeEach(function() {
        peopleGetHandler.respond(200, people);

        runController();

        $httpBackend.flush();
      });

      it('stores the people in $scope.people', function () {
        expect(scope.people).toEqual(people);
      });
    });

    describe('when loading all people is unsuccessful', function() {
      beforeEach(function() {
        peopleGetHandler.respond(500, {message: 'internal error'});

        runController();

        $httpBackend.flush();
      });

      it('sets an error flash', function () {
        expect(flash.error).toBeDefined();
      });
    });
  });
});
