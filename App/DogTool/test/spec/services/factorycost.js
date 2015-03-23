'use strict';

describe('Service: FactoryCost', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryCost;

    //mocks
    var $http, poller;

    //variables
    var route, costID, callback, cost, searchObject, response, returned;

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            //setup mocks
            $http = $injector.get('$http');
            poller = $injector.get('poller');

            //get service
            FactoryCost = $injector.get('FactoryCost');

            //configure
            route = 'http://localhost:1337/Cost';
            costID = 1;

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

            returned = FactoryCost.get(costID);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(route + '/' + costID);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('get all', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryCost.getAll();
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

            FactoryCost.listen(callback);
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

            cost = {
                id: 1,
                name: 'billy'
            };

            returned = FactoryCost.post(cost);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(route, jasmine.any(Object));
        });

        it('passes the correct cost to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), cost);
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

            returned = FactoryCost.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(route + '/find', jasmine.any(Object));
        });

        it('passes the correct cost to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });
});