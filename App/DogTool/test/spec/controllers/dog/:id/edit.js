'use strict';

describe('Controller: DogIdEditCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogIdEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DogIdEditCtrl = $controller('DogIdEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
