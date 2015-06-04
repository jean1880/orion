'use strict';

/* global Mockery */

describe('Controller: PersonEditFormCtrl', function() {
  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PersonEditFormCtrl,
    scope,
    $httpBackend,
    SailsRoute,
    FactoryAddress,
    addressGetHandler;

  var address,
    person;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope, $controller) {
    scope = $rootScope.$new();
    $httpBackend   = $injector.get('$httpBackend');
    SailsRoute     = $injector.get('SailsRoute');
    FactoryAddress = $injector.get('FactoryAddress');

    address = Mockery.mockAddress();
    person = Mockery.mockPerson({Address: address});

    addressGetHandler = $httpBackend.whenGET(SailsRoute.Address.get(address.id)).respond(200, address);

    spyOn(FactoryAddress, 'get').and.callThrough();

    scope.editForm = {
      $valid: true
    };
    scope.person = person;


    PersonEditFormCtrl = $controller('PersonEditFormCtrl', {
      $scope: scope
    });
  }));

  describe('when person is changed', function() {

    describe('when person.Address is just an id hash', function() {
      beforeEach(function () {
        person.Address = address.id;

        scope.person = person;

        scope.$digest();
      });

      it('tries to load the address', function () {
        expect(FactoryAddress.get).toHaveBeenCalledWith(address.id);
      });
    });

    describe('when the address is fully loaded', function() {
      beforeEach(function () {
        person.Address = address;

        scope.person = person;

        scope.$digest();
      });

      it('does not try to load the address', function () {
        expect(FactoryAddress.get).not.toHaveBeenCalled();
      });
    });

    describe('when person is null', function() {
      beforeEach(function () {
        scope.person = null;
        scope.$digest();
      });

      it('does not try to load the address', function () {
        expect(FactoryAddress.get).not.toHaveBeenCalled();
      });
    });

    describe('when loading an address is successful', function() {
      beforeEach(function () {
        addressGetHandler.respond(200, address);
        person.Address = address.id;
        scope.person = person;
        scope.$digest();
        $httpBackend.flush();
      });

      it('replaces person.Address with the response', function() {
        expect(scope.person.Address).toEqual(address);
      });
    });
  });

  describe('$scope.editFormSubmit', function() {
    describe('when the form is valid', function() {
      beforeEach(function() {
        scope.editForm.$valid = true;
      });

      describe('when there is a callback', function() {
        beforeEach(function() {
          scope.formSubmit = function () {};
          spyOn(scope, 'formSubmit');

          scope.editFormSubmit();
        });

        it('calls the callback', function () {
          expect(scope.formSubmit).toHaveBeenCalled();
        });
      });

      describe('when there is no callback', function() {
        beforeEach(function () {
          scope.formSubmit = undefined;
        });

        it('does not throw an error', function () {
          expect(scope.editFormSubmit).not.toThrowError();
        });
      });
    });

    describe('when the form is invalid', function() {
      beforeEach(function() {
        scope.editForm.$valid = false;
      });

      describe('when there is a callback', function() {
        beforeEach(function() {
          scope.formSubmit = function () {};
          spyOn(scope, 'formSubmit');

          scope.editFormSubmit();
        });

        it('does not call the callback', function () {
          expect(scope.formSubmit).not.toHaveBeenCalled();
        });
      });

      describe('when there is no callback', function() {
        beforeEach(function () {
          scope.formSubmit = undefined;
        });

        it('does not throw an error', function () {
          expect(scope.editFormSubmit).not.toThrowError();
        });
      });
    });
  });
});
