'use strict';

/* global mockDog */

describe('Directive: dogCard', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  //load html files
  beforeEach(module('htmlFiles'));

  var element,
    $scope,
    $location;

  var dog;

  beforeEach(inject(function ($rootScope, $compile, _$location_) {
    $scope = $rootScope.$new();
    $location = _$location_;

    dog = mockDog();

    $scope.dog = dog;

    element = angular.element('<dog-card dog="dog"></dog-card>');
    element = $compile(element)($scope);

    $scope.$digest();
  }));

  it('displays the dog\'s name', function () {
    expect(element.text()).toContain($scope.dog.Name);
  });
});
