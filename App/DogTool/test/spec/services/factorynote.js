'use strict';

/* global Mockery */
/* global chance */

describe('Service: FactoryNote', function () {
    // load the service's module
    beforeEach(module('dogToolApp'));

    // instantiate service
    var FactoryNote, SailsRoute;

    //mocks
    var $http, poller;

    //variables
    var searchObject, response, returned;

    beforeEach(inject(function (_poller_, _$http_, _FactoryNote_, _SailsRoute_) {
        //setup mocks
        $http = _$http_;
        poller = _poller_;
        SailsRoute = _SailsRoute_;

        //get service
        FactoryNote = _FactoryNote_;

        returned = null;
    }));

    describe('get one', function () {
        var note;

        beforeEach(function () {
            dog = Mockery.mockNote();

            spyOn($http, 'get').and.returnValue(note);

            returned = FactoryNote.get(note.id);
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Note.get(note.id));
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(note);
        });
    });

    describe('get all', function () {
        var notes;

        beforeEach(function () {
            notes = [];

            for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
                notes.push(Mockery.mockNote());
            }

            spyOn($http, 'get').and.returnValue(notes);

            returned = FactoryNote.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Note.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(notes);
        });
    });

    describe('listen', function () {
        beforeEach(function () {
            spyOn(poller, 'get');
            FactoryDog.listen();
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.Note.route);
        });
    });

    describe('post', function () {
        var note;

        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            note = Mockery.mockNote();

            returned = FactoryNote.post(note);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Note.route, jasmine.any(Object));
        });

        it('passes the correct note to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), note);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('find', function () {
        var note;

        beforeEach(function () {
            note = Mockery.mockNote();

            spyOn($http, 'post').and.returnValue(note);

            searchObject = {
                name: note.name
            };

            returned = Factorynote.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Note.find, jasmine.any(Object));
        });

        it('passes the correct note to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(note);
        });
    });

    describe('update', function () {
        var note;

        beforeEach(function () {
            note = Mockery.mockNote();

            spyOn($http, 'post').and.returnValue(note);

            returned = FactoryNote.update(note);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Note.get(note.id), jasmine.any(Object));
        });

        it('passes the correct note to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), note);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(note);
        });
    });
});
