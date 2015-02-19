'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:appFooter
 * @description
 * # appFooter
 */
angular.module('dogToolApp')
  .directive('appFooter', function () {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/app-footer.html'
    };
  });
