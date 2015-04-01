'use strict';

describe('Controller: PersonSelectCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PersonSelectCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonSelectCreateCtrl = $controller('PersonSelectCreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
