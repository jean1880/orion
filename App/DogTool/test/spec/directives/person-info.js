'use strict';

describe('Directive: personInfo', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  var $compile;

  var element,
    scope;

  var buildElement = function (html) {
    html = angular.element(html);
    return $compile(html)(scope);
  };


  beforeEach(inject(function ($rootScope, $injector) {
    $compile = $injector.get('$compile');
    scope = $rootScope.$new();
  }));

  it('should compile', function () {
    element = buildElement('<person-info></person-info>');
  });
});
