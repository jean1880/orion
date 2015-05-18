'use strict';

/* global Mockery */
/* global chance */

describe('Service: FactoryAddress', function () {
  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryAddress, SailsRoute;

  //mocks
  var $http, poller;

  //variables
  var response, returned;

  beforeEach(inject(function (_FactoryAddress_, _SailsRoute_, _poller_, _$http_) {
    //Set services used by the factory
    $http = _$http_;
    poller = _poller_;
    SailsRoute = _SailsRoute_;

    // load factory
    FactoryAddress = _FactoryAddress_;

    returned = null;
  }));

  describe('get one', function () {
    var Address;

    beforeEach(function () {
      Address = Mockery.mockAddress();

      spyOn($http, 'get').and.returnValue(Address);

      returned = FactoryAddress.get(Address.id);
    });

    it('makes a call to sails get', function () {
      expect($http.get).toHaveBeenCalled();
    });

    it('makes a call to the correct route', function () {
      expect($http.get).toHaveBeenCalledWith(SailsRoute.Address.get(Address.id));
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(Address);
    });
  });

  describe('get all', function () {
    var Addresss;

    beforeEach(function () {
      Addresss = [];

      for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
        Addresss.push(Mockery.mockAddress());
      }

      spyOn($http, 'get').and.returnValue(Addresss);

      returned = FactoryAddress.getAll();
    });

    it('makes a call to sails get', function () {
      expect($http.get).toHaveBeenCalled();
    });

    it('makes a call to sails with the correct route', function () {
      expect($http.get).toHaveBeenCalledWith(SailsRoute.Address.getAll);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(Addresss);
    });
  });

  describe('listen', function () {
    beforeEach(function () {
      spyOn(poller, 'get').and.returnValue(response);
      FactoryAddress.listen();
    });

    it('starts listening for changes', function () {
      expect(poller.get).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect(poller.get).toHaveBeenCalledWith(SailsRoute.Address.listen);
    });
  });

  describe('post', function () {
    var Address;

    beforeEach(function () {
      Address = Mockery.mockAddress();

      spyOn($http, 'post').and.returnValue(Address);

      returned = FactoryAddress.post(Address);
    });

    it('makes a call to sails post', function () {
      expect($http.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Address.post, jasmine.any(Object));
    });

    it('passes the correct Address to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), Address);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(Address);
    });
  });

  describe('find', function () {
    var Address, searchObject;

    beforeEach(function () {
      Address = Mockery.mockAddress();

      spyOn($http, 'post').and.returnValue(Address);

      searchObject = {
        DateTaken: Address.DateTaken
      };

      returned = FactoryAddress.find(searchObject);
    });

    it('makes a call to sails post', function () {
      expect($http.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Address.find, jasmine.any(Object));
    });

    it('passes the correct Address to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(Address);
    });
  });

  describe('update', function () {
    var Address;

    beforeEach(function () {
      Address = Mockery.mockAddress();

      spyOn($http, 'post').and.returnValue(Address);

      returned = FactoryAddress.update(Address);
    });

    it('makes a call to sails post', function () {
      expect($http.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Address.update(Address.id), jasmine.any(Object));
    });

    it('passes the correct Address to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), Address);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(Address);
    });
  });
});
