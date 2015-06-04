'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:personPanel
 * @description
 * # personPanel
 */
angular.module('dogToolApp')
  .directive('personEditForm', function () {
    return {
      restrict: 'E',
      scope: {
        person: '=',
        formSubmit: '='
      },
      templateUrl: 'views/directives/person-edit-form.html',
      controller: 'PersonEditFormCtrl'
    };
  });
