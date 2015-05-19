'use strict';

/*global Mockery*/
/*global chance*/


describe('Service: FactoryHomework', function () {

  // load the service's module
    beforeEach(module('dogToolApp'));

  // instantiate service
    var FactoryHomework, SailsRoute;

    //mocks
    var $http, poller;
    
    //variables
    var searchObject, response, returned;
    
    beforeEach(inject(function () {
        angular.mock.inject(function ($injector){
  
      //get service
        FactoryHomework = $injector.get('FactoryHomework');
        returned = null;
      //set mocks
        $http = $injector.get('$http');
        poller = $injector.get('poller');
        SailsRoute = $injector.get('SailsRoute');
        });
    
      
    }));
    
    describe('get one', function () {
        var homework;
        
        beforeEach(function () {
            homework = Mockery.mockHomework();
            
            spyOn($http, 'get').and.returnValue(homework);
            
            returned = FactoryHomework.get(homework.id);
        });
        
        it('make a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });
        it('returns a call to the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Homework.get(homework.id));
        });
        
        it('returns the respones from sails', function () {
            expect(returned).toBe(homework);
        });
    });
            
    describe('get all', function () {
        var homework;

        beforeEach(function () {
            homework = [];

            for (var i = chance.natural({min: 5, max: 10}); i >= 0; i--) {
                homework.push(Mockery.mockHomework());
            }

            spyOn($http, 'get').and.returnValue(homework);

            returned = FactoryHomework.getAll();
        });

        it('makes a call to sails get', function () {
            expect($http.get).toHaveBeenCalled();
        });

        it('makes a call to sails with the correct route', function () {
            expect($http.get).toHaveBeenCalledWith(SailsRoute.Homework.route);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(homework);
        });
    });

    describe('listen', function () {
        beforeEach(function () {
            spyOn(poller, 'get');
            FactoryHomework.listen();
        });

        it('starts to sails on', function () {
            expect(poller.get).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect(poller.get).toHaveBeenCalledWith(SailsRoute.Homework.route);
        });
    });

    describe('post', function () {
        var homework;

        beforeEach(function () {
            spyOn($http, 'post').and.returnValue(response);

            homework = Mockery.mockHomework();

            returned = FactoryHomework.post(homework);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Homework.route, jasmine.any(Object));
        });

        it('passes the correct Homework to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), homework);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(response);
        });
    });

    describe('find', function () {
        var homework;

        beforeEach(function () {
            homework = Mockery.mockHomework();

            spyOn($http, 'post').and.returnValue(homework);

            searchObject = {
                name: homework.name
            };

            returned = FactoryHomework.find(searchObject);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Homework.find, jasmine.any(Object));
        });

        it('passes the correct Homework to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(homework);
        });
    });

    describe('update', function () {
        var homework;

        beforeEach(function () {
            homework = Mockery.mockHomework();

            spyOn($http, 'post').and.returnValue(homework);

            returned = FactoryHomework.update(homework);
        });

        it('makes a call to sails post', function () {
            expect($http.post).toHaveBeenCalled();
        });

        it('passes the correct route to sails', function () {
            expect($http.post).toHaveBeenCalledWith(SailsRoute.Homework.get(homework.id), jasmine.any(Object));
        });

        it('passes the correct Homework to sails', function () {
            expect($http.post).toHaveBeenCalledWith(jasmine.any(String), homework);
        });

        it('returns the response from sails', function () {
            expect(returned).toBe(homework);
        });
    });

});