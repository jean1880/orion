'use strict';

describe('Service: FactoryWeight', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryWeight, SailsRoute;

    //mocks
    var $http, poller;

    //variables
    var weightID, weight, searchObject, response, returned;

    beforeEach(inject(function (_FactoryWeight_, _SailsRoute_, _poller_, _$http_) {
        //Set services used by the factory
        $http = _$http_;
        poller = _poller_;
        SailsRoute = _SailsRoute_;

        // load factory
        FactoryWeight = _FactoryWeight_;

        //configure
        weightID = 1;

        response = {
            status: 200,
            message: 'success'
        };

        returned = null;
    }));

    describe('get one', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryWeight.get(weightID);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Weight.get(weightID));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('get all', function () {
        beforeEach(function () {
            spyOn($http, 'get').and.returnValue(response);

            returned = FactoryWeight.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Weight.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('listen', function () {
        beforeEach(function () {
            spyOn(poller, 'get').and.returnValue(response);
            FactoryWeight.listen();
        });

        it('starts listening for changes', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.Weight.route);
        });
    });

    describe('post', function () {
        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            weight = {
                id: 1,
                name: 'billy'
            };

            returned = FactoryWeight.post(weight);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Weight.route, jasmine.any(Object));
        });

        it('passes the correct weight to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), weight);
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

            returned = FactoryWeight.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Weight.find, jasmine.any(Object));
        });

        it('passes the correct weight to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });
});
