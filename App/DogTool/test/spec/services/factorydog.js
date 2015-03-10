'use strict';

/* global mockDog */
/* global chance */

describe('Service: FactoryDog', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryDog, SailsRoute;

    //mocks
    var $http, poller;

    //variables
    var searchObject, response, returned;

    beforeEach(inject(function (_poller_, _$http_, _FactoryDog_, _SailsRoute_) {
        //setup mocks
        $http = _$http_;
        poller = _poller_;
        SailsRoute = _SailsRoute_;

        //get service
        FactoryDog = _FactoryDog_;

        returned = null;
    }));

    describe('get one', function () {
        var dog;

        beforeEach(function () {
            dog = mockDog();

            spyOn($http, 'get').and.returnValue(dog);

            returned = FactoryDog.get(dog.id);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Dog.get(dog.id));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(dog);
        });
    });

    describe('get all', function () {
        var dogs;

        beforeEach(function () {
            dogs = [];

            for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
                dogs.push(mockDog());
            }

            spyOn($http, 'get').and.returnValue(dogs);

            returned = FactoryDog.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Dog.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(dogs);
        });
    });

    describe('listen', function () {
        beforeEach(function () {
            spyOn(poller, 'get').and.returnValue(response);
            FactoryDog.listen();
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.Dog.route);
        });
    });

    describe('post', function () {
        var dog;

        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            dog = mockDog();

            returned = FactoryDog.post(dog);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Dog.route, jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), dog);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('find', function () {
        var dog;

        beforeEach(function () {
            dog = mockDog();

            spyOn($http, 'post').and.returnValue(dog);

            searchObject = {
                name: dog.name
            };

            returned = FactoryDog.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Dog.find, jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(dog);
        });
    });

    describe('update', function () {
        var dog;

        beforeEach(function () {
            dog = mockDog();

            spyOn($http, 'post').and.returnValue(dog);

            returned = FactoryDog.update(dog);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Dog.get(dog.id), jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), dog);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(dog);
        });
    });
});
