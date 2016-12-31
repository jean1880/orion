'use strict';

/**
 * @ngdoc directive
 * @name dogToolApp.directive:weightList
 * @description
 * # weightList
 */
angular.module('dogToolApp')
  .directive('weightList', function () {
    return {
      templateUrl: '/app/Dog/dog-view/weight-list/weight-list.html',
      restrict: 'E',
      scope: {
        dog: '='
      },
      controller: 'WeightListCtrl'
    };
  });
