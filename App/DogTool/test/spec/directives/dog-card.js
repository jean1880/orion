'use strict';

describe('Directive: dogCard', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  //load html files for
  beforeEach(module('htmlFiles'));

  var element,
    $scope,
    dog;

  beforeEach(inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();

    dog = {
      Name: chance.first()
    };

    $scope.dog = dog;

    element = angular.element('<dog-card dog="dog"></dog-card>');
    element = $compile(element)($scope);

    $scope.$digest();
  }));

  it('displays the dog\'s name', function () {
    expect(element.text()).toContain(dog.Name);
  });
});
