'use strict';

describe('Controller: PeopleViewCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PeopleViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeopleViewCtrl = $controller('PeopleViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
