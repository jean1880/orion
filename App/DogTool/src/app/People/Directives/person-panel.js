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
        panelTitle: '@',
        panelType: '@',
        person: '=',
        personUpdated: '=?',
        unlinkable: '=?'
      },
      link: function ($scope) {
        $scope.unlinkable = angular.isDefined($scope.unlinkable) ? $scope.unlinkable : true;
      },
      templateUrl: '/app/People/Directives/person-panel.html',
      controller: 'PersonPanelCtrl'
    };
  });