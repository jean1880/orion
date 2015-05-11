'use strict';

/* global Mockery */

describe('Controller: PeopleViewCtrl', function () {

  var scope;

  var runController = inject(function ($controller) {
    var ctrl = $controller('DogNewCtrl', {
      $scope: scope
    });

    return ctrl;
  });

  beforeEach(inject(function($rootScope, $injector) {

  }));

});
