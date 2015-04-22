'use strict';

/* global Mockery */

describe('Controller: PersonInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PersonInfoCtrl,
    scope,
    $httpBackend,
    SailsRoute,
    FactoryAddress,
    addressGetHandler;

  var person,
    address;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope, $controller) {
    $httpBackend   = $injector.get('$httpBackend');
    SailsRoute     = $injector.get('SailsRoute');
    FactoryAddress = $injector.get('FactoryAddress');

    scope = $rootScope.$new();

    address = Mockery.mockAddress();
    person  = Mockery.mockPerson({Address: address});

    addressGetHandler = $httpBackend.whenGET(SailsRoute.Address.get(address.id)).respond(200, address);

    spyOn(FactoryAddress, 'get').and.callThrough();

    PersonInfoCtrl = $controller('PersonInfoCtrl', {
      $scope: scope
    });
  }));

  describe('when $scope.person changes to an undefined person', function () {
    beforeEach(function () {
      scope.person = undefined;
      scope.$digest();
    });

    it('doesn\'t try to load the address', function() {
      expect(FactoryAddress.get).not.toHaveBeenCalled();
    });
  });

  describe('when $scope.person changes to a defined person', function () {
    describe('when the address is a hash', function () {
      beforeEach(function () {
        person.Address = address.id;

        scope.person = person;

        scope.$digest();
      });

      it('tries to load the address', function() {
        expect(FactoryAddress.get).toHaveBeenCalledWith(address.id);
      });

      afterEach(function() {
        $httpBackend.flush();
      });
    });

    describe('when the address is an object', function () {
      beforeEach(function () {
        scope.person = person;
        scope.$digest();
      });

      it('doesn\'t try to load the address', function() {
        expect(FactoryAddress.get).not.toHaveBeenCalled();
      });
    });

    describe('when loading the address is successful', function() {
      beforeEach(function () {
        person.Address = address.id;
        scope.person = person;
        scope.$digest();
        $httpBackend.flush();
      });

      it('sets the person\'s address to the response', function() {
        expect(scope.person.Address).toEqual(address);
      });
    });
  });
});
