'use strict';

describe('Controller: BusinessInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var BusinessInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinessInfoCtrl = $controller('BusinessInfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
