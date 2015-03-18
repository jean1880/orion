'use strict';

describe('Service: FactoryDog', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryDog,
	   .$http;

    beforeEach(inject(function ($injector) {
        //get service
        FactoryDog = $injector.get('FactoryDog');
		$http = $injector.get('$http');
    }));
	
	describe('get()', function () {
		beforeEach(function (){
			callValue = { msg: 'hi' };
		
			spyOn($http, 'get').returnValue(callValue);
			
			dogID = chance.natural();
			
			response = FactoryDog.get(dogID);
		});
		
		it('will make a call to sails', function () {
			expect($http.get).toHaveBeenCalled();
		});
		
		it('get the correct dog from sails', function () {
			expect($http.get).toHaveBeenCalledWith(SailsRoute.Dog.get(dogID));
		});
		
		it('return the response from sails', function () {
			expect(response).toBe(callValue);
		});
	})
	
	describe('post()', function () {
		var dog;
	
		beforeEach(function () {
			dog = Mockery.mockDog();
			
			spyOn($http, 'post');
		
			FactoryDog.post();
		});
		
		it('will make a post to sails', function () {
			expect($http.post).toHaveBeenCalled();
		});
		
		it('to pass a dog to sails', function () {
			expect($http.get).toHaveBeenCalledWith(SailsRoute.Dog.route, jasmine.any(Object));
		});
		
		it('to pass a dog to sails', function () {
			expect($http.get).toHaveBeenCalledWith(jasmine.any(String), dog);
		});
		
		it('returns the response from sails', function () {
			expect(returned).toBe(dog);
		});
	});
});
