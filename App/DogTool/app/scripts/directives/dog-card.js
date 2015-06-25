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
        dog: '=',
        btnText: '=',
        btnClick: '&',
        btnType: '='
      },
      templateUrl: 'views/directives/dog-card.html',
      controller: function ($scope, $location) {
        $scope.gotoDogPage = function() {
          $location.path('/dog/' + $scope.dog.id);
        };

        $scope.callButtonCallback = function ($event) {
            $event.stopPropagation();
            $scope.btnClick();
        };
      }
    };
  });
