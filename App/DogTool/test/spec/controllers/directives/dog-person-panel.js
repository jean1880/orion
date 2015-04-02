'use strict';

describe('Controller: DogPersonPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogPersonPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DogPersonPanelCtrl = $controller('DogPersonPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});