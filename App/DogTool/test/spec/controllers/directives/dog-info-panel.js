'use strict';

/* global Mockery */
/* global chance */

describe('Controller: DogInfoPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogInfoPanelCtrl,
    scope,
    $httpBackend,
    SailsRoute,
    FactoryDog,
    dogPostHandler;

  var dog;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope, $controller) {
    scope = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');

    dog = Mockery.mockDog();

    dogPostHandler = $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(200, dog);

    spyOn(FactoryDog, 'update').and.callThrough();

    scope.infoForm = {
      $setDirty: function (value) {
        this.$dirty = value;
      },
      $dirty: false
    };
    scope.dog = dog;


    DogInfoPanelCtrl = $controller('DogInfoPanelCtrl', {
      $scope: scope
    });
  }));

  describe('$scope.editInfoBtn()', function () {
    beforeEach(function () {
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
          scope.dog.Breed = chance.word({length: 2});
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
