'use strict';

describe('Controller: NewjobsCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var NewjobsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewjobsCtrl = $controller('NewjobsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
