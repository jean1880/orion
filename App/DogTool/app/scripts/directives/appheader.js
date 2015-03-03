'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('dogToolApp')
  .directive('appHeader', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/app-header.html'
    };
  });
