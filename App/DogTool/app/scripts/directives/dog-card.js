'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:dogCard
 * @description
 * # dogCard
 */
angular.module('dogToolApp')
  .directive('dogCard', function () {
    return {
      restrict: 'E',
      scope: {
        dog: '='
      },
      templateUrl: 'views/directives/dog-card.html',
      controller: 'DogCardCtrl'
    };
  });
