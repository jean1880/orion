'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:personPanel
 * @description
 * # personPanel
 */
angular.module('dogToolApp')
  .directive('personPanel', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the personPanel directive');
      }
    };
  });
