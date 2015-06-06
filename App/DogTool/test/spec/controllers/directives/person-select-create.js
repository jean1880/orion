'use strict';

/* global Mockery */
/* global chance */

describe('Controller: PersonSelectCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PersonSelectCreateCtrl,
    $rootScope,
    $controller,
    $httpBackend,
    scope,
    SailsRoute,
    FactoryPeople,
    flash;

  var people;

  var peopleGetHandler,
    peoplePostHandler;

  var loadSelectForm = function () {
    scope.selectForm = {
      $valid: true,
      $setPristine: function () {},
      $setUntouched: function () {}
    };

    spyOn(scope.selectForm, '$setPristine');
    spyOn(scope.selectForm, '$setUntouched');
  };

  var loadCreateForm = function () {
    scope.createForm = {
      $valid: true,
      $setPristine: function () {},
      $setUntouched: function () {}
    };

    spyOn(scope.createForm, '$setPristine');
    spyOn(scope.createForm, '$setUntouched');
  };

  var runController = function () {
    PersonSelectCreateCtrl = $controller('PersonSelectCreateCtrl', {
      $scope: scope
    });

    $httpBackend.flush();
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $rootScope    = $injector.get('$rootScope');
    $controller   = $injector.get('$controller');
    $httpBackend  = $injector.get('$httpBackend');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryPeople = $injector.get('FactoryPeople');
    flash         = $injector.get('flash');

    scope = $rootScope.$new();

    people = [{},{},{}];

    spyOn(FactoryPeople, 'getAll').and.callThrough();
    spyOn(FactoryPeople, 'post').and.callThrough();

    peopleGetHandler = $httpBackend.whenGET(SailsRoute.People.getAll).respond(200, people);
    peoplePostHandler = $httpBackend.whenPOST(SailsRoute.People.post).respond(200, people);
  }));

  describe('when loaded', function() {
    it('sets mode to empty string', function () {
      runController();

      expect(scope.mode).toEqual('');
    });

    it('loads all users', function () {
      runController();

      expect(FactoryPeople.getAll).toHaveBeenCalled();
    });

    describe('after selectForm has been loaded', function () {
      beforeEach(function () {
        loadSelectForm();

        runController();
      });

      it('sets the selectForm to pristine', function () {
        expect(scope.selectForm.$setPristine).toHaveBeenCalledWith(true);
      });

      it('sets the selectForm to untouched', function () {
        expect(scope.selectForm.$setUntouched).toHaveBeenCalledWith(true);
      });
    });

    describe('after createForm has been loaded', function () {
      beforeEach(function () {
        loadCreateForm();

        runController();
      });

      it('sets the selectForm to pristine', function () {
        expect(scope.createForm.$setPristine).toHaveBeenCalledWith(true);
      });

      it('sets the selectForm to untouched', function () {
        expect(scope.createForm.$setUntouched).toHaveBeenCalledWith(true);
      });
    });

    describe('when getting all people is successful', function () {
      beforeEach(function () {
        peopleGetHandler.respond(200, people);
      });

      it('sets scope.people to the response', function() {
        runController();

        expect(scope.people).toEqual(people);
      });
    });
  });

  describe('when "editMode.disabled" is received', function() {
    beforeEach(function() {
      runController();
    });

    it('sets mode to empty string', function () {
      $rootScope.$broadcast('editMode.disabled');

      expect(scope.mode).toEqual('');
    });

    describe('after selectForm has been loaded', function () {
      beforeEach(function () {
        loadSelectForm();
      });

      it('sets the selectForm to pristine', function () {
        $rootScope.$broadcast('editMode.disabled');

        expect(scope.selectForm.$setPristine).toHaveBeenCalledWith(true);
      });

      it('sets the selectForm to untouched', function () {
        $rootScope.$broadcast('editMode.disabled');

        expect(scope.selectForm.$setUntouched).toHaveBeenCalledWith(true);
      });
    });

    describe('after createForm has been loaded', function () {
      beforeEach(function () {
        loadCreateForm();

        runController();
      });

      it('sets the selectForm to pristine', function () {
        expect(scope.createForm.$setPristine).toHaveBeenCalledWith(true);
      });

      it('sets the selectForm to untouched', function () {
        expect(scope.createForm.$setUntouched).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('$scope.createFormSubmit', function() {
    var newPerson;

    beforeEach(function () {
      runController();

      loadCreateForm();
      scope.createForm.$valid = true;
      newPerson = Mockery.mockPerson();

      scope.newPerson = newPerson;
    });

    it('tries to create a new person', function () {
      scope.createFormSubmit();

      $httpBackend.flush();

      expect(FactoryPeople.post).toHaveBeenCalled();
    });

    it('tries to create a new person with the new data', function () {
      scope.createFormSubmit();

      $httpBackend.flush();

      expect(FactoryPeople.post).toHaveBeenCalledWith(newPerson);
    });

    describe('when creating a person is successful', function() {
      beforeEach(function () {
        peoplePostHandler.respond(200, newPerson);
      });

      it('adds the person to scope.people', function () {
        scope.createFormSubmit();

        $httpBackend.flush();

        expect(scope.people).toContain(newPerson);
      });

      it('updates the selectedId', function () {
        scope.createFormSubmit();

        $httpBackend.flush();

        expect(scope.selectedId).toEqual(newPerson.id);
      });

      it('resets scope.newPerson', function () {
        scope.createFormSubmit();

        $httpBackend.flush();

        expect(scope.newPerson).toEqual({});
      });
    });

    describe('when creating a person is successful', function() {
      beforeEach(function () {
        peoplePostHandler.respond(400, {});
      });

      it('sets an error flash', function () {
        scope.createFormSubmit();

        $httpBackend.flush();

        expect(flash.error).toBeDefined();
      });

      it('does not change the selectedId', function () {
        scope.createFormSubmit();

        $httpBackend.flush();

        expect(scope.selectedId).not.toEqual(newPerson.id);
      });

      it('does not reset scope.newPerson', function () {
        scope.createFormSubmit();

        $httpBackend.flush();

        expect(scope.newPerson).toEqual(newPerson);
      });
    });
  });

  describe('with a personIdChanged callback', function () {
    beforeEach(function () {
      scope.personIdChanged = function () {};
      spyOn(scope, 'personIdChanged');

      runController();
    });

    describe('$scope.selectFormSubmit', function () {
      describe('when the selectForm is valid', function() {
        var newPersonId;

        beforeEach(function () {
          loadSelectForm();
          scope.selectForm.$valid = true;
          scope.selectedId = chance.hash;

          newPersonId = scope.selectedId;
        });

        it('calls the personIdChanged callback', function () {
          scope.selectFormSubmit();

          expect(scope.personIdChanged).toHaveBeenCalled();
        });

        it('calls the personIdChanged callback with the new person id', function () {
          scope.selectFormSubmit();

          expect(scope.personIdChanged).toHaveBeenCalledWith(newPersonId);
        });
      });

      describe('when the selectForm is invalid', function() {
        beforeEach(function () {
          loadSelectForm();
          scope.selectForm.$valid = false;
        });

        it('does not call the personIdChanged callback', function () {
          scope.selectFormSubmit();

          expect(scope.personIdChanged).not.toHaveBeenCalled();
        });
      });
    });

    describe('$scope.createFormSubmit', function () {
      describe('when the createForm is valid', function() {
        var newPersonId;

        beforeEach(function () {
          loadCreateForm();
          scope.createForm.$valid = true;
          scope.newPerson = Mockery.mockPerson();

          newPersonId = scope.newPerson.id;
        });

        describe('when creating a person is successful', function() {
          beforeEach(function () {
            peoplePostHandler.respond(200, scope.newPerson);
          });

          it('calls the personIdChanged callback', function () {
            scope.createFormSubmit();

            $httpBackend.flush();

            expect(scope.personIdChanged).toHaveBeenCalled();
          });

          it('calls the personIdChanged callback with the new person id', function () {
            scope.createFormSubmit();

            $httpBackend.flush();

            expect(scope.personIdChanged).toHaveBeenCalledWith(newPersonId);
          });
        });

        describe('when creating a person is unsuccessful', function() {
          beforeEach(function () {
            peoplePostHandler.respond(400, {});
          });

          it('does not call the personIdChanged callback', function () {
            scope.createFormSubmit();

            $httpBackend.flush();

            expect(scope.personIdChanged).not.toHaveBeenCalled();
          });
        });
      });

      describe('when the createForm is invalid', function() {
        beforeEach(function () {
          loadCreateForm();
          scope.createForm.$valid = false;
        });

        it('does not call the personIdChanged callback', function () {
          scope.createFormSubmit();

          expect(scope.personIdChanged).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('without a personIdChanged callback', function () {
    beforeEach(function () {
      scope.personIdChanged = null;

      runController();
    });

    describe('$scope.selectFormSubmit', function () {
      describe('when the selectForm is valid', function() {
        beforeEach(function () {
          loadSelectForm();
          scope.selectForm.$valid = true;
        });

        it('does not throw an error', function () {
          expect(scope.selectFormSubmit).not.toThrowError();
        });
      });
    });

    describe('$scope.createFormSubmit', function () {
      describe('when the createForm is valid', function() {
        beforeEach(function () {
          loadCreateForm();
          scope.createForm.$valid = true;
        });

        it('does not throw an error', function () {
          expect(function () {
            scope.createFormSubmit();
            $httpBackend.flush();
          }).not.toThrowError();
        });
      });
    });
  });
});
