'use strict';

/* global Mockery */
/* global chance */

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

    scope.infoForm = {
      $setDirty: function (value) {
        this.$dirty = value;
      },
      $dirty: false
    };

    dogGetHandler  = $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
    dogPostHandler = $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(200, dog);

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

  describe('$scope.editInfoBtn()', function () {
    beforeEach(function () {
      runController();
      scope.editInfoBtn();
    });

    it('sets $scope.editingInfo to true', function () {
      expect(scope.editingInfo).toBeTruthy();
    });

    it('makes a duplicate of $scope.dog', function () {
      expect(scope.editedDog).not.toBe(scope.dog);
    });
  });

  describe('$scope.saveInfoBtn()', function () {
    beforeEach(function () {
      runController();
    });

    describe('when not editing info', function () {
      beforeEach(function () {
        scope.editingInfo = false;
      });

      describe('when called', function () {
        beforeEach(function () {
          scope.saveInfoBtn();
        });

        it('does not attempt to update the dog', function () {
          expect(FactoryDog.update).not.toHaveBeenCalled();
        });
      });
    });

    describe('when editing info', function () {
      beforeEach(function () {
        scope.editInfoBtn();
      });

      describe('when form is not dirty', function () {
        beforeEach(function () {
          scope.infoForm.$dirty = false;
        });

        describe('when called', function () {
          beforeEach(function () {
            scope.saveInfoBtn();
          });

          it('does not attempt to update the dog', function () {
            expect(FactoryDog.update).not.toHaveBeenCalled();
          });
        });
      });

      describe('when form is dirty', function () {
        beforeEach(function () {
          scope.infoForm.$dirty = true;
          scope.editedDog.Breed = chance.word({length: 2});
        });

        describe('when called', function () {
          beforeEach(function () {
            scope.saveInfoBtn();
            $httpBackend.flush();
          });

          it('attempts to update the edited dog', function () {
            expect(FactoryDog.update).toHaveBeenCalledWith(scope.editedDog);
          });

          it('does not attempt to update the original dog', function () {
            expect(FactoryDog.update).not.toHaveBeenCalledWith(scope.dog);
          });
        });

        describe('when updating is successful', function() {
          beforeEach(function () {
            scope.saveInfoBtn();
            $httpBackend.flush();
          });

          it('sets $scope.editingInfo to false', function () {
            expect(scope.editingInfo).toBeFalsy();
          });
        });

        describe('when updating fails', function() {
          var response = {};

          beforeEach(function () {
            dogPostHandler.respond(400, response);
            scope.saveInfoBtn();
            $httpBackend.flush();
          });

          it('does not set $scope.editingInfo to false', function () {
            expect(scope.editingInfo).not.toBeFalsy();
          });
        });
      });
    });
  });

  describe('$scope.cancelInfoBtn()', function () {
    beforeEach(function () {
      runController();
    });

    describe('when called', function () {
      beforeEach(function () {
        scope.editingInfo = true;
        scope.cancelInfoBtn();
      });

      it('does not attempt to update the dog', function () {
        expect(FactoryDog.update).not.toHaveBeenCalled();
      });

      it('sets $scope.editingInfo to false', function () {
        expect(scope.editingInfo).not.toBeTruthy();
      });
    });
  });
});
