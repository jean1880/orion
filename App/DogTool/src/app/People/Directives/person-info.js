'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:personPanel
 * @description
 * # personPanel
 */
angular.module('dogToolApp')
  .directive('personInfo', function () {
    return {
      restrict: 'E',
      scope: {
        person: '=',
        hideName: '@'
      },
      templateUrl: 'app/People/Directives/person-info.html',
      controller: 'PersonInfoCtrl'
    };
  });