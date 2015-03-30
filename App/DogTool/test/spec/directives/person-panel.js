'use strict';

describe('Directive: personPanel', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-panel></person-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the personPanel directive');
  }));
});
