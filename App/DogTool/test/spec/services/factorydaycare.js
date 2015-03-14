'use strict';

describe('Service: FactoryDaycare', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var factorydaycare,
      $http,
	  poller,
	  SailsRoute,
	  searchObject,
	  response,
	  returned;
  
  beforeEach(inject(function($injector) {
    factorydaycare = $injector.get('FactoryDaycare');
	$http          = $injector.get('$http');
	SailsRoute     = $injector.get('SailsRoute');
	poller 		   = $injector.get('poller');
	returned 	   = null
  }));
  

  //Testing get() function
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
  
  //testing getAll() function
  describe('getAll()', function () {
        var daycares;

        beforeEach(function () {
            daycares = [];

            for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
                daycares.push(Mockery.mockDaycare());
            }

            spyOn($http, 'get').and.returnValue(daycares);

            returned = factorydaycare.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Daycare.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(daycares);
        });
    });
  
  //Testing listen() function
  describe('listen()', function () {
	
	beforeEach(function () {
	 spyOn(poller, 'get');
	 factorydaycare.listen();
	});
	
	it('starts to sails on', function () {
	  expect(poller.get).toHaveBeenCalled();
	});
	
	it('passes the correct route to sails', function () {
	  expect(poller.get).toHaveBeenCalledWith(SailsRoute.Daycare.route);
	});
	
  });

  //Testing post() function
  describe('post()', function () {
	var daycare;
	beforeEach(function () {
	  spyOn($http, 'post').and.returnValue(response);
	  daycare = Mockery.mockDaycare();
	  returned = factorydaycare.post(daycare);
	});

	it('makes a call to sails post', function () {
	  expect($http.post).toHaveBeenCalled();
	});
	
	it('passes the correct route to sails', function () {
	  expect($http.post).toHaveBeenCalledWith(SailsRoute.Daycare.route, jasmine.any(Object));
	});

	it('passes the correct dog to sails', function () {
	  expect($http.post).toHaveBeenCalledWith(jasmine.any(String), daycare);
	});

	it('returns the response from sails', function () {
	  expect(returned).toBe(response);
	});
 });

  //Testing find() function
  describe('find()', function () {
	var daycare;
	
	beforeEach(function () {
	  daycare = Mockery.mockDaycare();
	  spyOn($http, 'post').and.returnValue(daycare);
	  
	  searchObject = {
	  name: daycare.name
	  };

	  returned = factorydaycare.find(searchObject);
	});

	it('makes a call to sails post', function () {
	  expect($http.post).toHaveBeenCalled();
	});

	it('passes the correct route to sails', function () {
	  expect($http.post).toHaveBeenCalledWith(SailsRoute.Daycare.find, jasmine.any(Object));
	});

	it('passes the correct dog to sails', function () {
	  expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
	});

	it('returns the response from sails', function () {
	  expect(returned).toBe(daycare);
	});
  });

  //Testing update() function
  describe('update()', function () {
	var daycare;

	beforeEach(function () {
	  daycare = Mockery.mockDaycare();
	  spyOn($http, 'post').and.returnValue(daycare);
	  returned = factorydaycare.update(daycare);
	});

	it('makes a call to sails post', function () {
	  expect($http.post).toHaveBeenCalled();
	});

	it('passes the correct route to sails', function () {
	  expect($http.post).toHaveBeenCalledWith(SailsRoute.Daycare.get(daycare.id), jasmine.any(Object));
	});

	it('passes the correct dog to sails', function () {
	  expect($http.post).toHaveBeenCalledWith(jasmine.any(String), daycare);
	});

	it('returns the response from sails', function () {
	  expect(returned).toBe(daycare);
	});
  });
});