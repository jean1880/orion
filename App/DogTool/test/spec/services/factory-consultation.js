'use strict';

describe('Service: FactoryConsultation', function () {

  // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryConsultation;

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
            FactoryConsultation = $injector.get('FactoryConsultation');

            returned = null;
        });
    });

    describe('get one', function () {
        var consultation;

        beforeEach(function () {
            consultation = Mockery.mockConsultation();

            spyOn($http, 'get').and.returnValue(consultation);

            returned = FactoryConsultation.get(consultation.id);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Consultation.get(consultation.id));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(consultation);
        });
    });

    describe('get all', function () {
        var consultation;

        beforeEach(function () {
            consultation = [];
            for(var i = chance.natural({min: 3, max: 5}); i > 0; i--) {
                consultation.push(Mockery.mockConsultation({}, false));
            }

            spyOn($http, 'get').and.returnValue(consultation);

            returned = FactoryConsultation.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Consultation.getAll);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(consultation);
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

            FactoryConsultation.listen();
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.Consultation.listen);
        });
    });

    describe('post', function () {
        var consultation;

        beforeEach(function () {
            consultation = Mockery.mockConsultation();

            spyOn($http, 'post').and.returnValue(consultation);

            returned = FactoryConsultation.post(consultation);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Consultation.post, jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), consultation);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(consultation);
        });
    });

    describe('find', function () {
        var consultation,
            searchObject;

        beforeEach(function () {
            consultation = Mockery.mockConsultation();

            spyOn($http, 'post').and.returnValue(consultation);

            searchObject = {
                name: consultation.Name
            };

            returned = FactoryConsultation.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Consultation.find, jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(consultation);
        });
    });

    describe('update', function () {
        var consultation;

        beforeEach(function () {
            consultation = Mockery.mockConsultation();

            spyOn($http, 'post').and.returnValue(consultation);

            returned = FactoryConsultation.update(consultation);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Consultation.update(consultation.id), jasmine.any(Object));
        });

        it('passes the correct dog to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), consultation);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(consultation);
        });
    });

});
