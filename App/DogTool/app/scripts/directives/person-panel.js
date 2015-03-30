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
      restrict: 'E',
      scope: {
        person: '=',
        panelTitle: '@',
        panelType: '@'
      },
      templateUrl: 'views/directives/person-panel.html',
      controller: 'PersonPanelCtrl'
    };
  });
