'use strict';

describe('Service: FactoryDog', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryDog, SailsRoute;

    //mocks
    var $http, poller;

    //variables
    var dogID, callback, dog, searchObject, response, returned;

    beforeEach(inject(function (_poller_, _$http_, _FactoryDog_, _SailsRoute_) {
        //setup mocks
        $http = _$http_;
        poller = _poller_;
        SailsRoute = _SailsRoute_;

        //get service
        FactoryDog = _FactoryDog_;

        //configure
        dogID = 1;

        response = {
            status: 200,
            message: 'success'
        };

        returned = null;
    }));

    describe('get one', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryDog.get(dogID);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Dog.get(dogID));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('get all', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryDog.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Dog.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('listen', function () {
        beforeEach(function () {
            spyOn(poller, 'get').and.returnValue(response);

            callback = function () {};

            FactoryDog.listen(callback);
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.Dog.route);
        });
    });

    describe('post', function () {
        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            dog = {
                id: 1,
                name: 'billy'
            };

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
        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            searchObject = {
                name: 'billy'
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
            expect(returned).toBe(response);
        });
    });
});
