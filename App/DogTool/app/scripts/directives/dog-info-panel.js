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
      restrict: 'E',
      scope: {
      	dog: '=',
        createMode: '='
      },
      templateUrl: 'views/directives/dog-info-panel.html',
      controller: 'DogInfoPanelCtrl'
    };
  });
