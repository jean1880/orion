'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogInfoPanel
 * @description
 * # dogInfoPanel
 */
angular.module('dogToolApp')
  .directive('dogInfoPanel', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the dogInfoPanel directive');
      }
    };
  });
