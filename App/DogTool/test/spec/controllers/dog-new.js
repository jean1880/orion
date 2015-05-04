'use strict';

/* global Mockery */

describe('Controller: DogNewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location,
    flash;

  // Initialize the controller and services
  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');
    flash         = $injector.get('flash');

    spyOn($location, 'path');
    spyOn(FactoryDog, 'post').and.callThrough();

    scope.dogEditForm = {
      $valid: true,
      $invalid: false,
      $submitted: false,
      $setValidity: function (newValue) {
        this.$valid = newValue;
        this.$invalid = !newValue;
      },
      $setSubmitted: function (newValue) {
        this.$submitted = newValue;
      }
    };

    scope.dog = Mockery.mockDog({Owner: null, Vet: null});
  }));

  var runController = inject(function ($controller) {
    var ctrl = $controller('DogNewCtrl', {
      $scope: scope
    });

    return ctrl;
  });

  describe('when the controller is loaded', function () {
    beforeEach(function () {
      runController();
    });

    it('adds an empty dog Object to the scope', function () {
      expect(scope.dog).toBeDefined();
    });

    it('sets the text for the save button', function () {
      expect(scope.saveBtnText).toBeDefined();
    });
  });

  describe('$scope.saveBtn', function () {
    beforeEach(function () {
      runController();
    });

    describe('when entire form is valid', function () {
      beforeEach(function () {
        scope.dogEditForm.$setValidity(true);
        scope.dog.Owner = Mockery.mockPerson({}, false);
        scope.dog.Vet = Mockery.mockPerson({}, false);
      });

      describe('when called', function () {
        beforeEach(function () {
          $httpBackend.whenPOST(SailsRoute.Dog.route).respond(200, scope.dog);

          scope.saveBtn();
          $httpBackend.flush();
        });

        it('attempts to save the dog', function () {
          expect(FactoryDog.post).toHaveBeenCalledWith(scope.dog);
        });
      });

      describe('when saving is successful', function() {
        var dog;

        beforeEach(function () {
          dog = Mockery.mockDog();

          $httpBackend.whenPOST(SailsRoute.Dog.route).respond(200, dog);

          scope.saveBtn();
          $httpBackend.flush();
        });

        it('changes the page location to the view page', function () {
          expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id);
        });

        it('sends a success flash', function () {
          expect(flash.success).not.toBeUndefined();
        });
      });

      describe('when saving is unsuccessful', function() {
        var response = {

        };

        beforeEach(function () {
          $httpBackend.whenPOST(SailsRoute.Dog.route).respond(400, response);

          scope.saveBtn();
          $httpBackend.flush();
        });

        it('does not changes the page location', function () {
          expect($location.path).not.toHaveBeenCalled();
        });

        it('sends a error flash', function () {
          expect(flash.error).not.toBeUndefined();
        });
      });
    });

    describe('when form is invalid', function () {
      beforeEach(function () {
        scope.dogEditForm.$setValidity(false);
        scope.dog.Owner = Mockery.mockPerson({}, false);
        scope.dog.Vet   = Mockery.mockPerson({}, false);
      });

      describe('when called', function () {
        beforeEach(function () {
          scope.saveBtn();
        });

        it('does not try to create the dog', function () {
          expect(FactoryDog.post).not.toHaveBeenCalled();
        });

        it('does not change the path', function () {
          expect($location.path).not.toHaveBeenCalled();
        });
      });
    });

    describe('when Owner is missing', function () {
      beforeEach(function () {
        scope.dogEditForm.$setValidity(true);
        scope.dog.Owner = null;
        scope.dog.Vet   = Mockery.mockPerson({}, false);
      });

      describe('when called', function () {
        beforeEach(function () {
          scope.saveBtn();
        });

        it('does not try to create the dog', function () {
          expect(FactoryDog.post).not.toHaveBeenCalled();
        });

        it('does not change the path', function () {
          expect($location.path).not.toHaveBeenCalled();
        });
      });
    });

    describe('when Vet is missing', function () {
      beforeEach(function () {
        scope.dogEditForm.$setValidity(true);
        scope.dog.Owner = Mockery.mockPerson({}, false);
        scope.dog.Vet   = null;
      });

      describe('when called', function () {
        beforeEach(function () {
          scope.saveBtn();
        });

        it('does not try to create the dog', function () {
          expect(FactoryDog.post).not.toHaveBeenCalled();
        });

        it('does not change the path', function () {
          expect($location.path).not.toHaveBeenCalled();
        });
      });
    });
  });
});
