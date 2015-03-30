'use strict';

/* global Mockery */
/* global chance */

describe('Controller: WeightListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var FactoryWeight,
    $controller,
    $httpBackend,
    SailsRoute;

  var WeightListCtrl,
    scope,
    dog,
    response,
    weight,
    newWeight;

  var weightPostHandler;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $injector) {
    scope = $rootScope.$new();

    dog = Mockery.mockDog();
    scope.dog = dog;

    FactoryWeight = $injector.get('FactoryWeight');
    $controller   = $injector.get('$controller');
    $httpBackend  = $injector.get('$httpBackend');
    SailsRoute    = $injector.get('SailsRoute');

    scope.weightForm = {
      Weight: {
        $error: {}
      }
    };

    WeightListCtrl = $controller('WeightListCtrl', {
      $scope: scope
    });

    newWeight = {
      Weight: chance.natural({min: 20, max: 100})
    };

    response = weight = Mockery.mockWeight();
    weightPostHandler = $httpBackend.whenPOST(SailsRoute.Weight.post).respond(200, response);

    spyOn(FactoryWeight, 'post').and.callThrough();
  }));

  describe('when created', function () {
    it('adds weightFormSubmitted() to the scope', function () {
      expect(scope.weightFormSubmitted).not.toBeUndefined();
    });

    it('adds convertDateTakenToDate(weight) to the scope', function () {
      expect(scope.convertDateTakenToDate).not.toBeUndefined();
    });

    it('sets the number of weights per page', function () {
      expect(scope.countPerPage).not.toBeUndefined();
    });

    it('sets the current page to the first', function () {
      expect(scope.page).toBe(1);
    });
  });

  describe('$scope.weightFormSubmitted()', function () {
    describe('when the form is invalid', function () {
      beforeEach(function () {
        scope.weightForm.$valid = false;
        scope.weightFormSubmitted();
      });

      it('doesn\'t try to post the weight', function () {
        expect(FactoryWeight.post).not.toHaveBeenCalled();
      });
    });

    describe('when the form is valid', function () {
      beforeEach(function () {
        scope.weightForm.$valid = true;
        scope.newWeight = newWeight;
      });

      describe('when called', function () {
        beforeEach(function () {
          scope.weightFormSubmitted();
        });

        it('sets $scope.processing to true', function () {
          expect(scope.processing).toBe(true);
        });

        it('tries to post the weight', function () {
          expect(FactoryWeight.post).toHaveBeenCalledWith(newWeight);
        });

        afterEach(function () {
          $httpBackend.flush();
        });
      });

      describe('when the post was successful', function () {
        beforeEach(function () {
          weightPostHandler.respond(200, response);
          scope.weightFormSubmitted();
          $httpBackend.flush();
        });

        it('sets $scope.processing to false', function () {
          expect(scope.processing).toBe(false);
        });

        describe('$scope.newWeight', function () {
          it('.Weight is reset to null', function () {
            expect(scope.newWeight.Weight).toBe(null);
          });

          it('.DateTaken is reset to null', function () {
            expect(scope.newWeight.DateTaken).toBe(null);
          });

          it('.Dog is reset to null', function () {
            expect(scope.newWeight.Dog).toBe(null);
          });
        });
      });

      describe('when the post was unsuccessful', function () {
        beforeEach(function () {
          response = Mockery.mockError();

          weightPostHandler.respond(400, response);

          scope.weightForm.$valid = true;
          scope.weightFormSubmitted();
          $httpBackend.flush();
        });

        it('sets $scope.processing to false', function () {
          expect(scope.processing).toBe(false);
        });

        describe('$scope.newWeight', function () {
          it('.Weight was not reset', function () {
            expect(scope.newWeight.Weight).not.toBe(null);
          });

          it('.DateTaken was not reset', function () {
            expect(scope.newWeight.DateTaken).not.toBe(null);
          });

          it('.Dog was not reset', function () {
            expect(scope.newWeight.Dog).not.toBe(null);
          });
        });
      });

      describe('when the post data is invalid', function () {
        var response;

        beforeEach(function () {
          response = Mockery.mockError();
          weightPostHandler.respond(400, response);
        });

        describe('with missing Weight attribute', function () {
          beforeEach(function () {
            response.addInvalidAttribute('Weight', 'required', 'Weight is required');
            scope.weightFormSubmitted();
            $httpBackend.flush();
          });

          it('sets the required error flag on the form', function () {
            expect(scope.weightForm.Weight.$error.required).toBe(true);
          });
        });

        describe('with Weight not as a float', function () {
          beforeEach(function () {
            response.addInvalidAttribute('Weight', 'float', 'Weight must be a float');
            scope.weightFormSubmitted();
            $httpBackend.flush();
          });

          it('sets the number error flag on the form', function () {
            expect(scope.weightForm.Weight.$error.number).toBe(true);
          });
        });

        describe('with Weight having an unexpected reason', function () {
          beforeEach(function () {
            response.addInvalidAttribute('Weight', 'floop', 'floop for you life!');
            scope.weightFormSubmitted();
            $httpBackend.flush();
          });

          it('will do something', function () {
            //later
          });
        });

        describe('with no invalid attributes', function () {
          beforeEach(function () {
            response.invalidAttributes = undefined;

            scope.weightFormSubmitted();
            $httpBackend.flush();
          });

          it('will do something', function () {
            //later
          });
        });
      });
    });
  });

  describe('$scope.convertDateTakenToDate(weight)', function () {
    var weight,
      returned;

    beforeEach(function () {
      weight = Mockery.mockWeight();
      returned = scope.convertDateTakenToDate(weight);
    });

    it('returns the weight\'s DateTaken as a date', function () {
      expect(returned).toEqual(new Date(weight.DateTaken));
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
