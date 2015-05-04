'use strict';

describe('Directive: personSelectCreate', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-select-create></person-select-create>');
    element = $compile(element)(scope);
  }));
});
