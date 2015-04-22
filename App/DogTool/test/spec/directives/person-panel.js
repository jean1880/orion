'use strict';

describe('Directive: personPanel', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  //load html files
  beforeEach(module('htmlFiles'));

  var
    $compile,
    $rootScope;

  var
    element,
    scope;

  var buildElement = function (html) {
    html = angular.element(html);
    return $compile(html)(scope);
  };

  //stub out nested directives
  beforeEach(module('dogToolApp', function($provide){
    $provide.factory('personInfoDirective',         function(){ return {}; });
    $provide.factory('personSelectCreateDirective', function(){ return {}; });
  }));

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');

    scope = $rootScope.$new();
  }));

  describe('when unlinkable is undefined', function () {
    beforeEach(function () {
      element = buildElement('<person-panel></person-panel>');
      $rootScope.$digest();
    });

    it('sets $scope.unlinkable to true', function () {
      expect(element.isolateScope().unlinkable).toBe(true);
    });
  });

  describe('when unlinkable is true', function () {
    beforeEach(function () {
      element = buildElement('<person-panel unlinkable="true"></person-panel>');
      $rootScope.$digest();
    });

    it('sets $scope.unlinkable to true', function () {
      expect(element.isolateScope().unlinkable).toBe(true);
    });
  });

  describe('when unlinkable is false', function () {
    beforeEach(function () {
      element = buildElement('<person-panel unlinkable="false"></person-panel>');
      $rootScope.$digest();
    });

    it('sets $scope.unlinkable to false', function () {
      expect(element.isolateScope().unlinkable).toBe(false);
    });
  });
});
