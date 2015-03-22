'use strict';

/* global Mockery */

describe('Controller: DogNewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogNewCtrl;

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location,
    flash,
    dogPostHandler;

  var dog;

  // Initialize the controller and services
  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');
    flash         = $injector.get('flash');

    dog = Mockery.mockDog();

    dogPostHandler = $httpBackend.whenPOST(SailsRoute.Dog.post).respond(200, dog);
    spyOn(FactoryDog, 'post').and.callThrough();

    spyOn($location, 'path');
  }));

  var runController = inject(function ($controller) {
    DogNewCtrl = $controller('DogNewCtrl', {
      $scope: scope
    });
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

    describe('when called', function () {
      beforeEach(function () {
        scope.saveBtn();
        $httpBackend.flush();
      });

      it('attempts to save the dog', function () {
        expect(FactoryDog.post).toHaveBeenCalledWith(scope.dog);
      });
    });

    describe('with valid data', function() {

      beforeEach(function () {
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

    describe('with invalid data', function() {
      var response = {};

      beforeEach(function () {
        dogPostHandler.respond(400, response);

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

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
