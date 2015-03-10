'use strict';

/* global Mockery */
/* global chance */

describe('Controller: DogCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  //services
  var scope,
    FactoryDog,
    $httpBackend,
    SailsRoute,
    $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$httpBackend_, _SailsRoute_, _$location_, _FactoryDog_) {
    scope         = $rootScope.$new();
    $httpBackend  = _$httpBackend_;
    $location     = _$location_;
    SailsRoute    = _SailsRoute_;
    FactoryDog    = _FactoryDog_;
  }));

  describe('with no routeParams,', function() {
    var dogs;

    var runController = inject(function ($controller) {
      var ctrl = $controller('DogCtrl', {
        $scope: scope
      });

      $httpBackend.flush();

      return ctrl;
    });

    beforeEach(inject(function () {
      dogs = [];

      for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
        dogs.push(Mockery.mockDog());
      }
    }));

    describe('when the controller is loaded', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
        spyOn(FactoryDog, 'getAll').and.callThrough();
        runController();
      });

      it('gets all dogs from factoryDogs', function () {
        expect(FactoryDog.getAll).toHaveBeenCalled();
      });
    });

    describe('when getting all dogs is successful', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
        runController();
      });

      it('populates $scope.dogs', function () {
        expect(scope.dogs).toBeDefined();
        expect(scope.dogs.length).toBe(dogs.length);
      });
    });

    describe('when getting a dog returns a 404', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(404, {message: 'not found'});
        runController();
      });

      it('does stuff', function () {

      });
    });

    describe('$scope.editBtn', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);

        runController();
        scope.editBtn();
      });

      it('doesn\'t change the page location', function () {
        expect($location.path).not.toHaveBeenCalled();
      });
    });

    describe('$scope.saveBtn', function () {
      beforeEach(function () {
        spyOn(FactoryDog, 'update');
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);

        runController();
        scope.saveBtn();
      });

      it('doesn\'t attempt to update the dog', function () {
        expect(FactoryDog.update).not.toHaveBeenCalled();
      });
    });
  });

  describe('with routeParams: id,', function () {
    var dog;

    var runController = inject(function ($controller) {
      var ctrl = $controller('DogCtrl', {
        $scope: scope,
        $routeParams: {id: dog.id}
      });

      $httpBackend.flush();

      return ctrl;
    });

    beforeEach(inject(function () {
      dog = Mockery.mockDog();
    }));

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

    describe('$scope.editBtn', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(dog);
        runController();
        scope.editBtn();
      });

      it('changes the page location to the edit page', function () {
        expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id + '/edit');
      });
    });

    describe('$scope.saveBtn', function () {
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
      });

      describe('with invalid data', function() {
        var response = {

        };

        beforeEach(function () {
          $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(400, response);
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
});
