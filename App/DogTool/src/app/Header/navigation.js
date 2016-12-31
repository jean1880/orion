(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name dogToolApp.directive:dogCard
   * @description
   * # dogCard
   */
  angular.module('dogToolApp')
    .directive('navigation', function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: '/app/Header/navigation.html',
        controller: navigationController
      };

      function navigationController($scope, $state) {
        $scope.$state = $state;
      }
    });
}())
