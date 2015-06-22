'use strict';

describe('Controller: BusinessinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var BusinessinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusinessinfoCtrl = $controller('BusinessinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
