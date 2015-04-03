'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogPersonPanel
 * @description
 * # dogPersonPanel
 */
angular.module('dogToolApp')
  .directive('personPanel', function () {
    return {
      restrict: 'E',
      scope: {
        panelTitle: '@',
        panelType: '@',
        person: '=',
        personUpdated: '='
      },
      templateUrl: 'views/directives/person-panel.html',
      controller: 'PersonPanelCtrl'
    };
  });
