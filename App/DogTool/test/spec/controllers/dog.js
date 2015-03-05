'use strict';

describe('Controller: DogCtrl', function () {

  // load the controller's module
  beforeEach(module('dogToolApp'));

  var DogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DogCtrl = $controller('DogCtrl', {
      $scope: scope
    });
  }));
});
