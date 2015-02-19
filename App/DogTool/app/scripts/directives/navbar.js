'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('dogToolApp')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/nav-bar.html'
    };
  });
