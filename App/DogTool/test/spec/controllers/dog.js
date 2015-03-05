'use strict';

/* global mockDog */

describe('Controller: DogCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  //services
  var DogCtrl,
    scope,
    FactoryDog,
    $httpBackend,
    ServerAddress,
    $location;

  //test properties
  var dog;

  var runController = inject(function ($controller) {
    var ctrl = $controller('DogCtrl', {
      $scope: scope,
      $routeParams: { id: dog.id },
    });

    $httpBackend.flush();

    return ctrl;
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$httpBackend_, _ServerAddress_, _$location_, _FactoryDog_) {
    scope         = $rootScope.$new();
    $httpBackend  = _$httpBackend_;
    $location     = _$location_;
    ServerAddress = _ServerAddress_;
    FactoryDog    = _FactoryDog_;

    dog = mockDog();

  }));

  it('gets a dog from factoryDogs', function () {
    $httpBackend.whenGET(ServerAddress + '/Dog/' + dog.id).respond(200, dog);
    spyOn(FactoryDog, 'get').and.callThrough();

    DogCtrl = runController();

    expect(FactoryDog.get).toHaveBeenCalledWith(dog.id);
  });

  describe('when getting a dog is successful', function () {
    beforeEach(function () {
      $httpBackend.whenGET(ServerAddress + '/Dog/' + dog.id).respond(200, dog);
    });

    it('populates $scope.dog', function () {
      spyOn($location, 'path');

      DogCtrl = runController();

      expect(scope.dog).toBeDefined();
      expect(scope.dog.id).toBe(dog.id);
    });
  });

  describe('when getting a dog returns a 404', function () {
    beforeEach(function () {
      $httpBackend.whenGET(ServerAddress + '/Dog/' + dog.id).respond(404, {message: 'not found'});
    });

    it('redirects to homepage', function () {
      spyOn($location, 'path');

      DogCtrl = runController();

      expect($location.path).toHaveBeenCalledWith('/');
    });
  });

  describe('editBtn', function () {
    beforeEach(function () {
      $httpBackend.whenGET(ServerAddress + '/Dog/' + dog.id).respond(dog);
      DogCtrl = runController();
    });

    it('changes the page location to the edit page', function () {
      spyOn($location, 'path');

      scope.editBtn();

      expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id + '/edit');
    });
  });

  describe('saveBtn', function () {
    beforeEach(function () {
      $httpBackend.whenGET(ServerAddress + '/Dog/' + dog.id).respond(dog);
      DogCtrl = runController();
    });

    describe('update success', function() {
      beforeEach(function () {
        $httpBackend.whenPOST(ServerAddress + '/Dog/' + dog.id).respond(200, dog);
      });

      it('changes the page location to the view page', function () {
        spyOn($location, 'path');

        scope.saveBtn();
        $httpBackend.flush();

        expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id);
      });
    });

    describe('with invalid data', function() {
      var response = {

      };

      beforeEach(function () {
        $httpBackend.whenPOST(ServerAddress + '/Dog/' + dog.id).respond(400, response);
      });

      it('does not changes the page location', function () {
        spyOn($location, 'path');

        scope.saveBtn();
        $httpBackend.flush();

        expect($location.path).not.toHaveBeenCalled();
      });
    });
  });
});
