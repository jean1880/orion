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

    dog = Mockery.mockDog();

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
  });

  describe('$scope.saveInfoBtn()', function () {
    beforeEach(function () {
      runController();
    });

    describe('when called', function () {
      beforeEach(function () {
        scope.saveInfoBtn();
        $httpBackend.flush();
      });

      it('attempts to update the dog', function () {
        expect(FactoryDog.update).toHaveBeenCalledWith(dog);
      });
    });

    describe('when updating is successful', function() {
      beforeEach(function () {
        scope.saveInfoBtn();
        $httpBackend.flush();
      });

      it('sets $scope.editingInfo to false', function () {
        expect(scope.editingInfo).toBeFalsey();
      });
    });

    describe('when updating fails', function() {
      var response = {};

      beforeEach(function () {
        dogPostHandler.respond(400, response);
        scope.saveInfoBtn();
        $httpBackend.flush();
      });
    });
  });
});
