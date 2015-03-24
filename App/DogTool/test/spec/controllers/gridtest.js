'use strict';

describe('Controller: GridtestCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var GridtestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GridtestCtrl = $controller('GridtestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
