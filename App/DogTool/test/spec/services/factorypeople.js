'use strict';

/* global Mockery */
/* global chance */

describe('Service: FactoryPeople', function () {

    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryPeople;

    //mocks
    var $http, poller, SailsRoute;

    //variables
    var returned;

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            //setup mocks
            $http = $injector.get('$http');
            poller = $injector.get('poller');
            SailsRoute = $injector.get('SailsRoute');

            //get service
            FactoryPeople = $injector.get('FactoryPeople');

            returned = null;
        });
    });

    describe('get one', function () {
        var person;

        beforeEach(function () {
            person = Mockery.mockPerson();

            spyOn($http, 'get').and.returnValue(person);

            returned = FactoryPeople.get(person.id);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.People.get(person.id));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(person);
        });
    });

    describe('get all', function () {
        var people;

        beforeEach(function () {
            people = [];
            for(var i = chance.natural({min: 3, max: 5}); i > 0; i--) {
                people.push(Mockery.mockPerson({}, false));
            }

            spyOn($http, 'get').and.returnValue(people);

            returned = FactoryPeople.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.People.getAll);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(people);
        });
    });

    describe('listen', function () {
        var response;

        beforeEach(function () {
            response = {
                status: 200,
                message: 'success'
            };

            spyOn(poller, 'get').and.returnValue(response);

            FactoryPeople.listen();
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.People.listen);
        });
    });

    describe('post', function () {
        var person;

        beforeEach(function () {
            person = Mockery.mockPerson();

            spyOn($http, 'post').and.returnValue(person);

            returned = FactoryPeople.post(person);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.People.post, jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), person);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(person);
        });
    });

    describe('find', function () {
        var person,
            searchObject;

        beforeEach(function () {
            person = Mockery.mockPerson();

            spyOn($http, 'post').and.returnValue(person);

            searchObject = {
                name: person.Name
            };

            returned = FactoryPeople.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.People.find, jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(person);
        });
    });

    describe('update', function () {
        var person;

        beforeEach(function () {
            person = Mockery.mockPerson();

            spyOn($http, 'post').and.returnValue(person);

            returned = FactoryPeople.update(person);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.People.update(person.id), jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), person);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(person);
        });
    });
});
