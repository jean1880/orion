'use strict';

/* global mockDog */

describe('Controller: DogCardCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogCardCtrl,
    scope,
    dog;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    dog = mockDog();
    scope.dog = dog;

    DogCardCtrl = $controller('DogCardCtrl', {
      $scope: scope
    });
  }));

  describe('onClick', function () {
    it('changes the location to the dog view page', inject(function ($location) {
      spyOn($location, 'path');

      scope.onClick();

      expect($location.path).toHaveBeenCalledWith('/dog/' + dog.id);
    }));
  });
});
