'use strict';

describe('Controller: PeopleListCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PeopleListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeopleListCtrl = $controller('PeopleListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
