'use strict';

describe('Service: FactoryDaycare', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factorydaycare,
      $http,
	  SailsRoute;
  
  beforeEach(inject(function($injector) {
    factorydaycare = $injector.get('FactoryDaycare');
	$http          = $injector.get('$http');
	SailsRoute     = $injector.get('SailsRoute');
  }));
  
	
  describe('get()', function () {
	var daycareID;
	var response;
	var callValue
	beforeEach(function () {
	  callValue = {msg: 'hi' };
	  spyOn($http, 'get').and.returnValue(callValue);
	  
	  daycareID = chance.natural();
	  
	  response = factorydaycare.get(daycareID);
	});
	
    it('will make a get call to sails', function () {
      expect($http.get).toHaveBeenCalled();
    });
	
	it('will get the correct daycare from sails', function () {
		expect($http.get).toHaveBeenCalledWith(SailsRoute.Daycare.get(daycareID));
	});
	
	it('will return the response from sails', function () {
      expect(response).toBe(callValue);
    });
  });
  
  describe('get()', function () {
	var daycare;
	var returned;
	
	beforeEach(function () {
	  daycare = Mockery.mockDaycare();
	  
	  spyOn($http, 'post').and.returnValue(daycare);
	
	  returned = factorydaycare.post(daycare);
	});
	
    it('will make a post call to sails', function () {
      expect($http.post).toHaveBeenCalled();
    });
	
	it('will pass a daycare to sails', function () {
      expect($http.post).toHaveBeenCalledWith(jasmine.any(String), daycare);
    });
	
	it('will pass a daycare to sails', function () {
      expect($http.post).toHaveBeenCalledWith(SailsRoute.Daycare.route, jasmine.any(Object));
    });
	
	it('will return a response form sails', function () {
      expect(returned).toBe(daycare);
    });
	
  });
  
});