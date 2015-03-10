'use strict';

/* global mockDog */

describe('Controller: DogCardCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogCardCtrl,
    scope,
    dog;

  var $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$location_) {
    scope = $rootScope.$new();
    $location = _$location_;

    dog = mockDog();
    scope.dog = dog;

    DogCardCtrl = $controller('DogCardCtrl', {
      $scope: scope
    });
  }));

  describe('scope.onClick', function () {
    beforeEach(function () {
      spyOn($location, 'path');
      scope.onClick();
    });

    it('changes the location to the dog view page', function ($location) {
      expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id);
    });
  });
});
