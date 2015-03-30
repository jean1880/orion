'use strict';

/* global Mockery */
/* global chance */

describe('Service: FactoryCost', function () {
  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryCost, SailsRoute;

  //mocks
  var $http, poller;

  //variables
  var response, returned;

  beforeEach(inject(function (_FactoryCost_, _SailsRoute_, _poller_, _$http_) {
    //Set services used by the factory
    $http = _$http_;
    poller = _poller_;
    SailsRoute = _SailsRoute_;

    // load factory
    FactoryCost = _FactoryCost_;

    returned = null;
  }));

  describe('get one', function () {
    var cost;

    beforeEach(function () {
      cost = Mockery.mockCost();

      spyOn($http, 'get').and.returnValue(cost);

      returned = FactoryCost.get(cost.id);
    });

    it('makes a call to sails get', function () {
      expect($http.get).toHaveBeenCalled();
    });

    it('makes a call to the correct route', function () {
      expect($http.get).toHaveBeenCalledWith(SailsRoute.Cost.get(cost.id));
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(cost);
    });
  });

  describe('get all', function () {
    var costs;

    beforeEach(function () {
      costs = [];

      for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
        costs.push(Mockery.mockCost());
      }

      spyOn($http, 'get').and.returnValue(costs);

      returned = FactoryCost.getAll();
    });

    it('makes a call to sails get', function () {
      expect($http.get).toHaveBeenCalled();
    });

    it('makes a call to sails with the correct route', function () {
      expect($http.get).toHaveBeenCalledWith(SailsRoute.Cost.getAll);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(costs);
    });
  });

  describe('listen', function () {
    beforeEach(function () {
      spyOn(poller, 'get').and.returnValue(response);
      FactoryCost.listen();
    });

    it('starts listening for changes', function () {
      expect(poller.get).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect(poller.get).toHaveBeenCalledWith(SailsRoute.Cost.listen);
    });
  });

  describe('post', function () {
    var cost;

    beforeEach(function () {
      cost = Mockery.mockCost();

      spyOn($http, 'post').and.returnValue(cost);

      returned = FactoryCost.post(cost);
    });

    it('makes a call to sails post', function () {
      expect($http.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Cost.post, jasmine.any(Object));
    });

    it('passes the correct cost to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), cost);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(cost);
    });
  });

  describe('find', function () {
    var cost, searchObject;

    beforeEach(function () {
      cost = Mockery.mockCost();

      spyOn($http, 'post').and.returnValue(cost);

      searchObject = {
        DateTaken: cost.DateTaken
      };

      returned = FactoryCost.find(searchObject);
    });

    it('makes a call to sails post', function () {
      expect($http.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Cost.find, jasmine.any(Object));
    });

    it('passes the correct cost to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(cost);
    });
  });

  describe('update', function () {
    var cost;

    beforeEach(function () {
      cost = Mockery.mockCost();

      spyOn($http, 'post').and.returnValue(cost);

      returned = FactoryCost.update(cost);
    });

    it('makes a call to sails post', function () {
      expect($http.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Cost.update(cost.id), jasmine.any(Object));
    });

    it('passes the correct cost to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), cost);
    });

    it('returns the response from sails', function () {
      expect(returned).toBe(cost);
    });
  });
});
