'use strict';

describe('Controller: PersonPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var PersonPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonPanelCtrl = $controller('PersonPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
