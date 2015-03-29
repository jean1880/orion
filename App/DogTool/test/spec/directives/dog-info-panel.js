'use strict';

describe('Directive: dogInfoPanel', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dog-info-panel></dog-info-panel>');
    element = $compile(element)(scope);
  }));
});
