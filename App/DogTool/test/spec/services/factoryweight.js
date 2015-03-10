'use strict';

/* global mockWeight */
/* global chance */

describe('Service: FactoryWeight', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryWeight, SailsRoute;

    //mocks
    var $http, poller;

    //variables
    var response, returned;

    beforeEach(inject(function (_FactoryWeight_, _SailsRoute_, _poller_, _$http_) {
        //Set services used by the factory
        $http = _$http_;
        poller = _poller_;
        SailsRoute = _SailsRoute_;

        // load factory
        FactoryWeight = _FactoryWeight_;

        returned = null;
    }));

    describe('get one', function () {
        var weight;

        beforeEach(function () {
            weight = mockWeight();

            spyOn($http, 'get').and.returnValue(weight);

            returned = FactoryWeight.get(weight.id);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Weight.get(weight.id));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(weight);
        });
    });

    describe('get all', function () {
        var weights;

        beforeEach(function () {
            weights = [];

            for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
                weights.push(mockWeight());
            }

            spyOn($http, 'get').and.returnValue(weights);

            returned = FactoryWeight.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Weight.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(weights);
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
        var weight;

        beforeEach(function () {
            weight = mockWeight();

            spyOn($http, 'post').and.returnValue(weight);

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
            expect(returned).toBe(weight);
        });
    });

    describe('find', function () {
        var weight, searchObject;

        beforeEach(function () {
            weight = mockWeight();

            spyOn($http, 'post').and.returnValue(weight);

            searchObject = {
                DateTaken: weight.DateTaken
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
            expect(returned).toBe(weight);
        });
    });

    describe('update', function () {
        var weight;

        beforeEach(function () {
            weight = mockWeight();

            spyOn($http, 'post').and.returnValue(weight);

            returned = FactoryWeight.update(weight);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Weight.get(weight.id), jasmine.any(Object));
        });

        it('passes the correct weight to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), weight);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(weight);
        });
    });
});
