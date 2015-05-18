'use strict';

describe('Controller: NewJobsCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var NewJobsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewJobsCtrl = $controller('NewJobsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
