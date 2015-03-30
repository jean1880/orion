'use strict';

describe('Controller: DirectivesPersonPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DirectivesPersonPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectivesPersonPanelCtrl = $controller('PersonPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
