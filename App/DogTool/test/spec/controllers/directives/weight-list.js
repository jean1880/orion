'use strict';

/* global Mockery */

describe('Controller: WeightListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var FactoryWeight,
    $controller;

  var WeightListCtrl,
    scope,
    dog;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $injector) {
    scope = $rootScope.$new();

    dog = Mockery.mockDog();
    scope.dog = dog;

    FactoryWeight = $injector.get('FactoryWeight');
    $controller = $injector.get('$controller');
  }));

  describe('when created', function () {
    beforeEach(function () {
      WeightListCtrl = $controller('WeightListCtrl', {
        $scope: scope
      });
    });

    it('adds weightFormSubmitted() to the scope');
    it('adds convertDateTakenToDate(weight) to the scope');
    it('sets the number of weights per page');
    it('sets the current page to the first');

    describe('the blank newWeight', function () {
      it('has no weight set');
      it('has no DateTaken set');
      it('has no Dog set');
    });
  });

  describe('$scope.weightFormSubmitted()', function () {
    describe('when the form is invalid', function () {
      beforeEach(function () {
        WeightListCtrl = $controller('WeightListCtrl', {
          $scope: scope
        });

        spyOn(FactoryWeight, 'post');

        scope.weightForm = {
          $valid: false
        };

        scope.weightFormSubmitted();
      });

      it('doesn\'t try to post the weight', function () {
        expect(FactoryWeight.post).not.toHaveBeenCalled();
      });
    });

    describe('when the form is valid', function () {
      describe('when called', function () {
        it('sets $scope.processing to true');
      });

      describe('when the post was successful', function () {
        it('sets $scope.processing to false');
        it('resets the newWeight');
      });

      describe('when the post was unsuccesful', function () {
        it('sets $scope.processing to false');
        it('doesn\'t reset the newWeight');
      });
    });
  });

  describe('$scope.convertDateTakenToDate(weight)', function () {
    var weight,
      returned;

    beforeEach(function () {
      WeightListCtrl = $controller('WeightListCtrl', {
        $scope: scope
      });

      weight = Mockery.mockWeight();

      returned = scope.convertDateTakenToDate(weight);
    });

    it('returns the weight\'s DateTaken as a date', function () {
      expect(returned).toEqual(new Date(weight.DateTaken));
    });
  });
});
