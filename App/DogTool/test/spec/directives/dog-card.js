'use strict';

describe('Directive: dogCard', function () {

  // load the directive's module
  beforeEach(module('dogToolApp'));

  //load html files
  beforeEach(module('htmlFiles'));

  var element,
    $scope;

  beforeEach(inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();

    $scope.dog = {
      Name: chance.first()
    };

    element = angular.element('<dog-card dog="dog"></dog-card>');
    element = $compile(element)($scope);

    $scope.$digest();
  }));

  it('displays the dog\'s name', function () {
    expect(element.text()).toContain($scope.dog.Name);
  });
});
