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
      restrict: 'E',
      scope: {
        panelTitle: '@',
        panelType: '@',
        person: '='
      },
      templateUrl: 'views/directives/dog-person-panel.html',
      controller: 'DogPersonPanelCtrl'
    };
  });
