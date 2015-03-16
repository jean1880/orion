'use strict';

describe('Service: FactoryPeople', function () {

  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryPeople;

  //mocks
  var $http, poller;

  //variables
  var route, peopleID, callback, person, searchObject, response, returned;

beforeEach(function () {
        angular.mock.inject(function ($injector) {
            //setup mocks
            $http = $injector.get('$http');
            poller = $injector.get('poller');

            //get service
            FactoryDog = $injector.get('FactoryPeople');

            //configure
            route = 'http://localhost:1337/People';
            dogID = 1;

            response = {
                status: 200,
                message: 'success'
            };

            returned = null;
        });
    });

    describe('get one', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryPeople.get(dogID);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(route + '/' + dogID);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('get all', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryPeople.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('listen', function () {
        beforeEach(function () {
            spyOn(poller, 'get').and.returnValue(response);

            callback = function () {};

            FactoryPeople.listen(callback);
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(route, jasmine.any(Function));
        });

        it('passes the correct callback to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(jasmine.any(String), callback);
        });
    });

    describe('post', function () {
        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            person = {
                id: 1,
                name: 'stephen'
            };

            returned = FactoryDog.post(dog);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(route, jasmine.any(Object));
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
                name: 'stephen'
            };

            returned = FactoryPeople.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(route + '/find', jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });
});
