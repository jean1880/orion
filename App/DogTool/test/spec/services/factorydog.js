'use strict';

describe('Service: FactoryDog', function () {
  // load the service's module
  beforeEach(module('dogToolApp'));

  // instantiate service
  var FactoryDog;

  //mocks
  var $sails;

  //variables
  var route;
  var dogID;
  var callback;
  var dog;
  var searchObject;
  var response;

  var returned;

  beforeEach(function() {
    angular.mock.inject(function ($injector) {
      //setup mocks
      $sails = $injector.get('$sails');

      //get service
      FactoryDog = $injector.get('FactoryDog');

      //configure
      route = '/Dog';
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
      spyOn($sails, 'get').and.returnValue(response);

      returned = FactoryDog.get(dogID);
    });

    it('makes a call to sails get', function () {
      expect($sails.get).toHaveBeenCalled();
    });

    it('makes a call to the correct route', function () {
      expect($sails.get).toHaveBeenCalledWith(route + '/' + dogID);
    });

    it('returns the response from sails', function(){
      expect(returned).toBe(response);
    });
  });

  describe('get all', function() {
    beforeEach(function () {
      spyOn($sails, 'get').and.returnValue(response);

      returned = FactoryDog.getAll();
    });

    it('makes a call to sails get', function() {
      expect($sails.get).toHaveBeenCalled();
    });

    it('makes a call to sails with the correct route', function() {
      expect($sails.get).toHaveBeenCalledWith(route);
    });

    it('returns the response from sails', function(){
      expect(returned).toBe(response);
    });
  });

  describe('listen', function() {
    beforeEach(function() {
      spyOn($sails, 'on').and.returnValue(response);

      callback = function () {};

      FactoryDog.listen(callback);
    });

    it('starts to sails on', function() {
      expect($sails.on).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function() {
      expect($sails.on).toHaveBeenCalledWith(route, jasmine.any(Function));
    });

    it('passes the correct callback to sails', function() {
      expect($sails.on).toHaveBeenCalledWith(jasmine.any(String), callback);
    });
  });

  describe('post', function() {
    beforeEach(function() {
      spyOn($sails, 'post').and.returnValue(response);

      dog = {
        id: 1,
        name: 'billy'
      };

      returned = FactoryDog.post(dog);
    });

    it('makes a call to sails post', function() {
      expect($sails.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function() {
      expect($sails.post).toHaveBeenCalledWith(route, jasmine.any(Object));
    });

    it('passes the correct dog to sails', function() {
      expect($sails.post).toHaveBeenCalledWith(jasmine.any(String), dog);
    });

    it('returns the response from sails', function(){
      expect(returned).toBe(response);
    });
  });

  describe('find', function() {
    beforeEach(function() {
      spyOn($sails, 'post').and.returnValue(response);

      searchObject = {
        name: 'billy'
      };

      returned = FactoryDog.find(searchObject);
    });

    it('makes a call to sails post', function() {
      expect($sails.post).toHaveBeenCalled();
    });

    it('passes the correct route to sails', function() {
      expect($sails.post).toHaveBeenCalledWith(route + '/find', jasmine.any(Object));
    });

    it('passes the correct dog to sails', function() {
      expect($sails.post).toHaveBeenCalledWith(jasmine.any(String), searchObject);
    });

    it('returns the response from sails', function(){
      expect(returned).toBe(response);
    });
  });
});
