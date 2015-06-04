'use strict';

describe('Directive: personEditForm', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<person-edit-form></person-edit-form>');
    element = $compile(element)(scope);
  }));
});
