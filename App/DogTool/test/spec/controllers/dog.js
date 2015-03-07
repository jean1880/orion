'use strict';

/* global mockDog */
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
        $scope: scope,
      });

      $httpBackend.flush();

      return ctrl;
    });

    beforeEach(inject(function () {
      dogs = [];

      for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
        dogs.push(mockDog());
      }
    }));

    it('gets all factoryDogs from factoryDogs', function () {
      $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
      spyOn(FactoryDog, 'getAll').and.callThrough();

      runController();

      expect(FactoryDog.getAll).toHaveBeenCalled();
    });

    describe('when getting all dogs is successful', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
      });

      it('populates $scope.dogs', function () {
        spyOn($location, 'path');

        runController();

        expect(scope.dogs).toBeDefined();
        expect(scope.dogs.length).toBe(dogs.length);
      });
    });

    describe('when getting a dog returns a 404', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(404, {message: 'not found'});
      });
    });

    describe('$scope.editBtn', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
        runController();
      });

      it('doesn\'t change the page location', function () {
        spyOn($location, 'path');

        scope.editBtn();

        expect($location.path).not.toHaveBeenCalled();
      });
    });

    describe('$scope.saveBtn', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.route).respond(200, dogs);
        runController();
      });

      it('doesn\'t attempt to update the dog', function () {
        spyOn(FactoryDog, 'update');

        scope.saveBtn();

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
      dog = mockDog();
    }));


    it('gets a dog from factoryDogs', function () {
      $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
      spyOn(FactoryDog, 'get').and.callThrough();

      runController();

      expect(FactoryDog.get).toHaveBeenCalledWith(dog.id);
    });

    describe('when getting a dog is successful', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
      });

      it('populates $scope.dog', function () {
        spyOn($location, 'path');

        runController();

        expect(scope.dog).toBeDefined();
        expect(scope.dog.id).toBe(dog.id);
      });
    });

    describe('when getting a dog returns a 404', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(404, {message: 'not found'});
      });

      it('redirects to homepage', function () {
        spyOn($location, 'path');

        runController();

        expect($location.path).toHaveBeenCalledWith('/');
      });
    });

    describe('$scope.editBtn', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(dog);
        runController();
      });

      it('changes the page location to the edit page', function () {
        spyOn($location, 'path');

        scope.editBtn();

        expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id + '/edit');
      });
    });

    describe('$scope.saveBtn', function () {
      beforeEach(function () {
        $httpBackend.whenGET(SailsRoute.Dog.get(dog.id)).respond(200, dog);
        runController();
      });

      it('attempts to update the dog', function () {
        $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(200, dog);
        spyOn(FactoryDog, 'update').and.callThrough();

        scope.saveBtn();
        $httpBackend.flush();

        expect(FactoryDog.update).toHaveBeenCalled();
      });

      describe('update success', function() {
        beforeEach(function () {
          $httpBackend.whenPOST(SailsRoute.Dog.get(dog.id)).respond(200, dog);
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
