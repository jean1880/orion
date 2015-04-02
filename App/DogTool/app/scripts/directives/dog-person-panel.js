'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogPersonPanel
 * @description
 * # dogPersonPanel
 */
angular.module('dogToolApp')
  .directive('dogPersonPanel', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the dogPersonPanel directive');
      }
    };
  });
