'use strict';

describe('Controller: CopyrightCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var CopyrightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CopyrightCtrl = $controller('CopyrightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CopyrightCtrl.awesomeThings.length).toBe(3);
  });
});
