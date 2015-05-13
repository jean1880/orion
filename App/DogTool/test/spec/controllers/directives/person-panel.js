'use strict';

/* global Mockery */

describe('Controller: PersonPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var FactoryPeople,
    $httpBackend,
    SailsRoute;

  var PersonPanelCtrl,
    scope,
    person;

  var personGetHandler;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    FactoryPeople = $injector.get('FactoryPeople');
    $httpBackend  = $injector.get('$httpBackend');
    SailsRoute    = $injector.get('SailsRoute');

    person = Mockery.mockPerson();

    scope.unlinkable = true;
    scope.person = person;

    spyOn(scope, '$broadcast');
    spyOn(FactoryPeople, 'get').and.callThrough();

    personGetHandler = $httpBackend.whenGET(SailsRoute.People.get(person.id)).respond(200, person);

    PersonPanelCtrl = $controller('PersonPanelCtrl', {
      $scope: scope
    });
  }));

  describe('when loaded', function() {
    it('sets edit mode to false', function() {
      expect(scope.editMode).toBe(false);
    });
  });

  describe('$scope.enableEditMode', function() {
    it('sets edit mode to true', function() {
      scope.enableEditMode();

      expect(scope.editMode).toBe(true);
    });
  });

  describe('$scope.disableEditMode', function() {
    beforeEach(function () {
      //set the edit mode to true to check for changes to the value
      scope.editMode = true;
    });

    it('sets edit mode to false', function() {
      scope.disableEditMode();

      expect(scope.editMode).toBe(false);
    });

    it('boradcasts "editMode.disabled"', function () {
      scope.disableEditMode();

      expect(scope.$broadcast).toHaveBeenCalledWith('editMode.disabled');
    });
  });

  describe('$scope.unlinkPerson', function() {
    describe('when unlinkable', function() {
      beforeEach(function () {
        scope.unlinkable = true;
      });

      it('sets the person to null', function () {
        scope.unlinkPerson();

        expect(scope.person).toEqual(null);
      });
    });

    describe('when not unlinkable', function() {
      beforeEach(function () {
        scope.unlinkable = false;
      });

      it('does not change person', function () {
        scope.unlinkPerson();
        expect(scope.person).toBe(person);
      });

      describe('when there is a personUpdated callback', function () {
        beforeEach(function () {
          scope.personUpdated = function() {};
          spyOn(scope, 'personUpdated');
        });

        it('does not call the callback', function () {
          scope.unlinkPerson();

          expect(scope.personUpdated).not.toHaveBeenCalled();
        });
      });

      describe('when there is no personUpdated callback', function () {
        beforeEach(function () {
          scope.personUpdated = null;
          spyOn(scope, 'personUpdated');
        });

        it('does not throw an error', function () {
          expect(scope.unlinkPerson).not.toThrowError();
        });
      });
    });
  });

  describe('$scope.personIdChanged', function() {
    beforeEach(function () {
      personGetHandler.respond(200, person);
    });

    describe('when called', function () {
      it('tries to load the person', function () {
        scope.personIdChanged(person.id);

        $httpBackend.flush();

        expect(FactoryPeople.get).toHaveBeenCalledWith(person.id);
      });
    });

    describe('when getting a person is successful', function() {
      var newPerson;

      beforeEach(function () {
        newPerson = Mockery.mockPerson({id: person.id}, false);
        personGetHandler.respond(200, newPerson);
      });

      it('sets the person to the new person', function () {
        scope.personIdChanged(person.id);

        $httpBackend.flush();

        expect(scope.person).toEqual(newPerson);
      });

      it('disables edit mode', function() {
        scope.personIdChanged(person.id);

        $httpBackend.flush();

        expect(scope.editMode).toBe(false);
      });
    });

    describe('when getting a person is unsuccessful', function() {
      beforeEach(function () {
        personGetHandler.respond(400, {});
      });

      it('does not throw an error', function () {
        expect(function () {
          scope.personIdChanged(person.id);
          $httpBackend.flush();
        }).not.toThrowError();
      });
    });
  });

  describe('when there is a personUpdated callback', function () {
    beforeEach(function () {
      scope.personUpdated = function() {};
      spyOn(scope, 'personUpdated');
    });

    describe('$scope.unlinkPerson', function() {

      describe('when unlinkable', function() {
        beforeEach(function () {
          scope.unlinkable = true;
        });

        it('calls the callback', function () {
          scope.unlinkPerson();

          expect(scope.personUpdated).toHaveBeenCalled();
        });
      });

      describe('when not unlinkable', function () {
        beforeEach(function () {
          scope.unlinkable = false;
        });

        it('does not call the callback', function () {
          scope.unlinkPerson();

          expect(scope.personUpdated).not.toHaveBeenCalled();
        });
      });
    });

    describe('$scope.personIdChanged', function() {
      describe('when getting a person is successful', function() {
        beforeEach(function () {
          personGetHandler.respond(200, person);
        });

        it('calls the callback', function () {
          scope.personIdChanged(person.id);

          $httpBackend.flush();

          expect(scope.personUpdated).toHaveBeenCalled();
        });
      });

      describe('when getting a person is unsuccessful', function() {
        beforeEach(function () {
          personGetHandler.respond(400, {});
        });

        it('does not call the callback', function () {
          scope.personIdChanged(person.id);

          $httpBackend.flush();

          expect(scope.personUpdated).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when there is no personUpdated callback', function () {
    beforeEach(function () {
      scope.personUpdated = null;
    });

    describe('$scope.unlinkPerson', function() {

      describe('when unlinkable', function() {
        beforeEach(function () {
          scope.unlinkable = true;
        });

        it('does not throw an error', function() {
          expect(scope.unlinkPerson).not.toThrowError();
        });
      });

      describe('when not unlinkable', function () {
        beforeEach(function () {
          scope.unlinkable = false;
        });

        it('does not throw an error', function() {
          expect(scope.unlinkPerson).not.toThrowError();
        });
      });
    });

    describe('$scope.personIdChanged', function() {
      describe('when getting a person is successful', function() {
        beforeEach(function () {
          personGetHandler.respond(200, person);
        });

        it('does not throw an error', function () {
          expect(function () {
            scope.personIdChanged(person.id);
            $httpBackend.flush();
          }).not.toThrowError();
        });
      });

      describe('when getting a person is unsuccessful', function() {
        beforeEach(function () {
          personGetHandler.respond(400, {});
        });

        it('does not throw an error', function () {
          expect(function () {
            scope.personIdChanged(person.id);
            $httpBackend.flush();
          }).not.toThrowError();
        });
      });
    });
  });
});
