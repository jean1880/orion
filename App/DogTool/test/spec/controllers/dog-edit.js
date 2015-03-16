'use strict';

/* global Mockery */

describe('Controller: DogEditCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location,
    flash;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope) {
    scope         = $rootScope.$new();
    $httpBackend  = $injector.get('$httpBackend');
    $location     = $injector.get('$location');
    SailsRoute    = $injector.get('SailsRoute');
    FactoryDog    = $injector.get('FactoryDog');
    flash         = $injector.get('flash');
  }));

  var dog;

  var runController = inject(function ($controller) {
    var ctrl = $controller('DogEditCtrl', {
      $scope: scope,
      $routeParams: {id: dog.id}
    });

    $httpBackend.flush();

    return ctrl;
  });

  beforeEach(function () {
    dog = Mockery.mockDog();
  });

  describe('when the controller is loaded', function() {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
      spyOn(FactoryDog, 'get').and.callThrough();
      runController();
    });

    it('gets a dog from factoryDogs', function () {
      expect(FactoryDog.get).toHaveBeenCalledWith(dog.id);
    });
  });

  describe('when getting a dog is successful', function () {
    beforeEach(function () {
      spyOn($location, 'path');
      $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
      runController();
    });

    it('populates $scope.dog', function () {
      expect(scope.dog).toBeDefined();
      expect(scope.dog.id).toBe(dog.id);
    });

    it('coverts the dog.Birthdate to a date object', function () {
      expect(scope.dog.Birthdate).toBeDate();
    });
  });

  describe('when getting a dog returns a 404', function () {
    beforeEach(function () {
      spyOn($location, 'path');
      $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(404, {message: 'not found'});

      runController();
    });

    it('redirects to homepage', function () {
      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

  describe('$scope.saveBtn()', function () {
    beforeEach(function () {
      $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
      runController();
    });

    describe('update success', function() {
      beforeEach(function () {
        spyOn($location, 'path');
        $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(200, dog);

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
      var response = {

      };

      beforeEach(function () {
        $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(400, response);

        spyOn($location, 'path');

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
});
