'use strict';

describe('Directive: weightList', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<weight-list></weight-list>');
    element = $compile(element)(scope);
  }));
});
