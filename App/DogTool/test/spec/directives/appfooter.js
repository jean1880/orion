'use strict';

describe('Directive: appFooter', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));
  beforeEach(module('htmlFiles'));

  var element,
    $scope;

  beforeEach(inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();

    element = angular.element('<app-footer></app-footer>');
    element = $compile(element)($scope);

    $scope.$digest();
  }));

  it('contains a copyright statement', function () {
    expect(element.text()).toContain('© copyright 2015');
  });

  it('contains the company name', function () {
    expect(element.text()).toContain('Not Just Kibble');
  });
});