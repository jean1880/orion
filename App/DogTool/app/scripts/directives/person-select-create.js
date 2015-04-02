'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:personSelectCreate
 * @description
 * # personSelectCreate
 */
angular.module('dogToolApp')
  .directive('personSelectCreate', function () {
    return {
      restrict: 'E',
      scope: {
        name: '@',
        selectedId: '=',
        onNewPersonId: '='
      },
      templateUrl: 'views/directives/person-select-create.html',
      controller: 'PersonSelectCreateCtrl'
    };
  });
