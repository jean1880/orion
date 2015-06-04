'use strict';

describe('Controller: HomeworkCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var HomeworkCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeworkCtrl = $controller('HomeworkCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
