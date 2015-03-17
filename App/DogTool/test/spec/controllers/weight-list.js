'use strict';

describe('Controller: WeightListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var WeightListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeightListCtrl = $controller('WeightListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
